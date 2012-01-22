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
import haxe.test.TestCase;
import haxe.test.Assert;
import haxe.framework.Injector;

import haxe.time.Clock;

using PreludeExtensions;
using haxe.framework.Injector;

class InjectorTestCase extends TestCase {
  public function new() {
    super();
  }
  
  public function testGlobalInjector() {
    Injector.enter(function(c) {
      c.bind(Clock, MockClock);
      
      Assert.is(Clock.inject(), MockClock);
      
      return Unit;
    });
  }
  
  public function testPackageInjectorOverridesGlobalInjector() {
    Injector.enter(function(c) {
      c.bind(Clock, MockClock);
      c.inPackage("haxe.framework").bind(Clock, SystemClock);

      Assert.is(Clock.inject(), SystemClock);
      
      return Unit;
    });
  }
  
  public function testModuleInjectorOverridesPackageInjector() {
    Injector.enter(function(c) {
      c.inPackage("haxe.framework").bind(Clock, MockClock);
      c.inModule("haxe.framework.InjectorTestCase").bind(Clock, SystemClock);

      Assert.is(Clock.inject(), SystemClock);
      
      return Unit;
    });
  }
  
  public function testClassInjectorOverridesPackageInjector() {
    Injector.enter(function(c) {
      c.inPackage("haxe.framework").bind(Clock, MockClock);
      c.inClass(InjectorTestCase).bind(Clock, SystemClock);

      Assert.is(Clock.inject(), SystemClock);
      
      return Unit;
    });
  }
  
  public function testOneToOneCreatesNewInstancesForEachInvocation() {
    Injector.enter(function(c) {
      c.bind(Clock, MockClock, OneToOne);
      
      var i1 = Clock.inject();
      var i2 = Clock.inject();
      
      Assert.isTrue(i1 != i2);
      
      return Unit;
    });
  }
  
  public function testOneToManyReturnsSameInstanceForEachInvocation() {
    Injector.enter(function(c) {
      c.bind(Clock, MockClock, OneToMany);
      
      var i1 = Clock.inject();
      var i2 = Clock.inject();
      
      Assert.isTrue(i1 == i2);
      
      return Unit;
    });
  }
  
  public function testAutoInjectionOneToOneFromMetadata() {
    Injector.enter(function(c) {
      var i1 = IAutoinjected.inject();
      var i2 = IAutoinjected.inject();
      Assert.is(i1, Autoinjected);
      Assert.isTrue(i1 != i2);
      return Unit;
    });
  }
  
  public function testAutoInjectionOneToManyFromMetadata() {
    Injector.enter(function(c) {
      var i1 = IAutoinjectedMany.inject();
      var i2 = IAutoinjectedMany.inject();
      Assert.is(i1, AutoinjectedMany);
      Assert.isTrue(i1 == i2);
      return Unit;
    });
  }
  
  public function testAutoInjectionHasLowerPrecedence() {
    Injector.enter(function(c) {
      Assert.is(IAutoinjected.inject(), Autoinjected);
      c.bind(IAutoinjected, NotAutoinjected, OneToOne);
      Assert.is(IAutoinjected.inject(), NotAutoinjected);
      return Unit;
    });
  }
}

@DefaultImplementation("haxe.framework.Autoinjected", "OneToOne")
interface IAutoinjected {
	
}

class Autoinjected implements IAutoinjected {
  public function new(){}
}

class NotAutoinjected implements IAutoinjected {
  public function new(){}
} 

@DefaultImplementation("haxe.framework.AutoinjectedMany", "OneToMany")
interface IAutoinjectedMany {
	
}

class AutoinjectedMany implements IAutoinjectedMany {
  public function new(){}
}