/*
 HaXe library written by John A. De Goes <john@socialmedia.com>
 Contributed by Social Media Networks

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the
 distribution.

 THIS SOFTWARE IS PROVIDED BY SOCIAL MEDIA NETWORKS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL SOCIAL MEDIA NETWORKS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
package haxe.framework;

import Prelude;

import haxe.PosInfos;

using PreludeExtensions;

enum BindingType {
  OneToOne;   // Every call to the injector will create a new instance
  OneToMany;  // Every call to the injector will return the same singleton instance
}

typedef Binder<T, S> = {
  /** Binds the interface to the specified implementation class.
   */
  function bind(interf: Class<T>, c: Class<Dynamic>, ?b: BindingType): S;

  /** Binds the interface to the specified factory. The factory will 
   * be used for creating instances of the specified type.
   */  
  function bindF(interf: Class<T>, f: Void -> T, ?b: BindingType): S;
}

/** An interface used to configure dependencies. */
interface InjectorConfig {
  /** Binds the interface to the specified implementation class.
   */
  public function bind<T>(interf: Class<T>, c: Class<Dynamic>, ?b: BindingType): InjectorConfig;
  
  /** Binds the interface to the specified factory. The factory will 
   * be used for creating instances of the specified type.
   */
  public function bindF<T>(interf: Class<T>, f: Void -> T, ?b: BindingType): InjectorConfig;
  
  /** Retrieves a binder that operates only in the scope of the specified class. 
   * This can be used to provide fine-grained control over implementations in
   * the scope of a particular class.
   */
  public function inClass<T>(c: Class<Dynamic>): Binder<T, InjectorConfig>;

  /** Retrieves a binder that operates only in the scope of the specified module. 
   * This can be used to provide fine-grained control over implementations in
   * the scope of a particular module.
   */
  public function inModule<T>(m: String): Binder<T, InjectorConfig>;
  
  /** Retrieves a binder that operates only in the scope of the specified package. 
   * This can be used to provide fine-grained control over implementations in
   * the scope of a particular package.
   */
  public function inPackage<T>(p: String): Binder<T, InjectorConfig>;
}

/** Featherweight injection library.
 * <pre>
 * import haxe.framework.Injector;
 *
 * ...
 *
 * Injector.enter(
 *  function(config) {
 *    config.bind(Clock, SystemClock, OneToMany);
 *    config.inClass(ClockConsumer).bind(Clock, MockClock);
 *
 *    myApp.run();
 *
 *    return Unit;
 *  }
 * );
 * </pre>
 */
class Injector {
  /** Injects an implementation of the specified interface. The implementation 
   * will be chosen based on the current bindings.
   */
  public static function inject<T>(interf: Class<T>, ?pos: PosInfos): T {
    return InjectorImpl.inject(interf, pos);
  }
  
  /** The entry point for a module. This is how an application specifies the 
   * configuration.
   *
   * @param f The module, which should specify the configuration and run the
   *          associated code.
   */
  public static function enter<T>(f: InjectorConfig -> T): T {
    return InjectorImpl.enter(f);
  }
  
  public static function forever<T>(f: InjectorConfig -> T): T {
    return InjectorImpl.forever(f);
  }
}

private typedef Bindings = {
  globalBindings:  Hash<Void -> Dynamic>,
  packageBindings: Hash<Hash<Void -> Dynamic>>,
  moduleBindings:  Hash<Hash<Void -> Dynamic>>,
  classBindings:   Hash<Hash<Void -> Dynamic>>
}

// Exists to workaround lack of "package" or "module" access specifiers:
private class InjectorImpl {
  static var state: Array<Bindings> = [];
  
  static var classBindingsExtractor = function(b: Bindings) { return b.classBindings; }
  static var moduleBindingsExtractor = function(b: Bindings) { return b.moduleBindings; }
  static var packageBindingsExtractor = function(b: Bindings) { return b.packageBindings; }

  public static function inject<T>(interf: Class<T>, ?pos: PosInfos): T {
    var binding = getMostSpecificBinding(interf, pos);
  
    var factory = binding.getOrElse(Stax.errorT('No binding defined for ' + Type.getClassName(interf)));
  
    return factory();
  }
  
  public static function forever<T>(f: InjectorConfig -> T): T {
    state.unshift({
      globalBindings:  new Hash(),
      packageBindings: new Hash(),
      moduleBindings:  new Hash(),
      classBindings:   new Hash()
    });
    
    return f(new InjectorConfigImpl());
  }
  
  public static function enter<T>(f: InjectorConfig -> T): T {
    state.unshift({
      globalBindings:  new Hash(),
      packageBindings: new Hash(),
      moduleBindings:  new Hash(),
      classBindings:   new Hash()
    });
    
    var result: T = null;
    
    try {
      result = f(new InjectorConfigImpl());
      
      state.shift();
    }
    catch (e: Dynamic) {
      state.shift();
      
      throw e;
    }
    
    return result;
  }

  /** Globally binds the interface to the specified implementation.
   */
  public static function bindTo<T, S>(interf: Class<T>, impl: Class<S>, ?bindingType: BindingType) {
    return globally().bindTo(interf, impl, bindingType);
  }

  /** Globally binds the interface to the specified factory.
   */
  public static function bindToF<T>(interf: Class<T>, f: Void -> T, ?bindingType: BindingType) {
    return globally().bindToF(interf, f, bindingType);
  }

  public static function globally<T>() {
    var internalBind = function(interf: Class<T>, f: Void -> T, ?bindingType: BindingType) {
      switch (bindingTypeDef(bindingType)) {
  	    case OneToOne:
  	      addGlobalBinding(interf, f);

  	    case OneToMany:
  	      addGlobalBinding(interf, f.memoize());
  	  }
    }
  
    return {
      bindToF: internalBind,
    
      bindTo: function(interf: Class<T>, impl: Class<Dynamic>, ?bindingType: BindingType) {
        internalBind(interf, factoryFor(impl), bindingType);
      },
    }
  }

  public static function inClass<T>(c: Class<Dynamic>) {
    return {
      bindToF: function(interf: Class<T>, f: Void -> T, ?bindingType: BindingType) {
        bindForSpecificF(classBindingsExtractor, interf, Type.getClassName(c), f, bindingType);
      },
    
      bindTo: function(interf: Class<T>, impl: Class<Dynamic>, ?bindingType: BindingType) {
        bindForSpecificF(classBindingsExtractor, interf, Type.getClassName(c), factoryFor(impl), bindingType);
      }
    }
  }

  public static function inModule<T>(moduleName: String) {
    return {
      bindToF: function(interf: Class<T>, f: Void -> T, ?bindingType: BindingType) {
        bindForSpecificF(moduleBindingsExtractor, interf, moduleName, f, bindingType);
      },
    
      bindTo: function(interf: Class<T>, impl: Class<Dynamic>, ?bindingType: BindingType) {
        bindForSpecificF(moduleBindingsExtractor, interf, moduleName, factoryFor(impl), bindingType);
      }
    }
  }

  public static function inPackage<T>(packageName: String) {
    return {
      bindToF: function(interf: Class<T>, f: Void -> T, ?bindingType: BindingType) {
        bindForSpecificF(packageBindingsExtractor, interf, packageName, f, bindingType);
      },
    
      bindTo: function(interf: Class<T>, impl: Class<Dynamic>, ?bindingType: BindingType) {
        bindForSpecificF(packageBindingsExtractor, interf, packageName, factoryFor(impl), bindingType);
      }
    }
  }

  private static function bindForSpecificF<T>(extractor: Bindings -> Hash<Hash<Void -> Dynamic>>, interf: Class<T>, specific: String, f: Void -> T, bindingType: BindingType) {
    switch (bindingTypeDef(bindingType)) {
      case OneToOne:
        addSpecificBinding(extractor(state.first()), interf, specific, f);
    
      case OneToMany:
        addSpecificBinding(extractor(state.first()), interf, specific, f.memoize());
    }
  }

  private static function getMostSpecificBinding(c: Class<Dynamic>, pos: PosInfos): Option<Void -> Dynamic> {
    var className   = classOf(pos);
    var moduleName  = moduleOf(pos);
    var packageName = packageOf(pos);
  
    return getClassBinding(c, className).orElse(getModuleBinding.lazy(c, moduleName)).orElse(getPackageBinding.lazy(c, packageName)).orElse(getGlobalBinding.lazy(c));
  }

  private static function getGlobalBinding(c: Class<Dynamic>): Option<Void -> Dynamic> {
    var className = Type.getClassName(c);
  
    return state.foldl(None, function(a: Option<Void -> Dynamic>, b: Bindings): Option<Void -> Dynamic> {
      return a.orElseC(b.globalBindings.get(className).toOption());
    });
  }

  private static function getClassBinding(c: Class<Dynamic>, className: String): Option<Void -> Dynamic> {
    return getSpecificBinding(classBindingsExtractor, c, className);
  }

  private static function getModuleBinding(c: Class<Dynamic>, moduleName: String): Option<Void -> Dynamic> {
    return getSpecificBinding(moduleBindingsExtractor, c, moduleName);
  }

  private static function getPackageBinding(c: Class<Dynamic>, packageName: String): Option<Void -> Dynamic> {
    return getSpecificBinding(packageBindingsExtractor, c, packageName);
  }

  private static function addGlobalBinding(c: Class<Dynamic>, f: Void -> Dynamic) {
    state.first().globalBindings.set(Type.getClassName(c), f);
  }

  private static function getSpecificBinding(extractor: Bindings -> Hash<Hash<Void -> Dynamic>>, c: Class<Dynamic>, specific: String): Option<Void -> Dynamic> {
    for (bindings in state) {
      var binding = extractor(bindings);
      
      var result = binding.get(Type.getClassName(c)).toOption().flatMap(function(h) return h.get(specific).toOption());
    
      if (!result.isEmpty()) {
        return result;
      }
    }
  
    return None;
  }

  private static function addSpecificBinding(bindings: Hash<Hash<Void -> Dynamic>>, c: Class<Dynamic>, specific: String, f: Void -> Dynamic) {
    var h = bindings.get(Type.getClassName(c));
  
    if (h == null) {
      h = new Hash();
    
      bindings.set(Type.getClassName(c), h);
    }
  
    h.set(specific, f);
  }

  private static function classOf(pos: PosInfos) {
    return pos.className;
  }

  private static function packageOf(pos: PosInfos) {
    return pos.className.substr(0, pos.className.lastIndexOf('.'));
  }

  private static function moduleOf(pos: PosInfos) {
    var className   = classOf(pos);
    var packageName = packageOf(pos);
    var moduleName  = packageName + '.' + pos.fileName.substr(0, pos.fileName.lastIndexOf('.'));
  
    return moduleName;
  }

  private static function factoryFor<T>(impl: Class<T>): Void -> T {
    return function() { 
      return Type.createInstance(impl, []);
    }
  }

  private static function bindingTypeDef(bindingType: BindingType) {
    return bindingType.toOption().getOrElseC(OneToMany);
  }
}

// Exists to workaround lack of inner classes:
private class InjectorConfigImpl implements InjectorConfig {
  public function new() {
  }
  
  public function bind<T>(interf: Class<T>, impl: Class<Dynamic>, ?b: BindingType): InjectorConfig {
    InjectorImpl.globally().bindTo(interf, impl, b);
    
    return this;
  }
      
  public function bindF<T>(interf: Class<T>, f: Void -> T, ?b: BindingType): InjectorConfig {
    InjectorImpl.globally().bindToF(interf, f, b);
        
    return this;
  }
  
  public function inClass<T>(c: Class<Dynamic>): Binder<T, InjectorConfig> {
    var self = this;
    
    return {
      bind: function(interf: Class<T>, impl: Class<Dynamic>, ?b: BindingType): InjectorConfig {
        InjectorImpl.inClass(c).bindTo(interf, impl, b);
        
        return self;
      },
      
      bindF: function(interf: Class<T>, f: Void -> T, ?b: BindingType): InjectorConfig {
        InjectorImpl.inClass(c).bindToF(interf, f, b);
        
        return self;
      }
    }
  }
  
  public function inPackage<T>(p: String): Binder<T, InjectorConfig> {
    var self = this;
    
    return {
      bind: function(interf: Class<T>, impl: Class<Dynamic>, ?b: BindingType): InjectorConfig {
        InjectorImpl.inPackage(p).bindTo(interf, impl, b);
        
        return self;
      },
      
      bindF: function(interf: Class<T>, f: Void -> T, ?b: BindingType): InjectorConfig {
        InjectorImpl.inPackage(p).bindToF(interf, f, b);
        
        return self;
      }
    }
  }
  
  public function inModule<T>(m: String): Binder<T, InjectorConfig> {
    var self = this;
    
    return {
      bind: function(interf: Class<T>, impl: Class<Dynamic>, ?b: BindingType): InjectorConfig {
        InjectorImpl.inModule(m).bindTo(interf, impl, b);
        
        return self;
      },
      
      bindF: function(interf: Class<T>, f: Void -> T, ?b: BindingType): InjectorConfig {
        InjectorImpl.inModule(m).bindToF(interf, f, b);
        
        return self;
      }
    }
  }
}