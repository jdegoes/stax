/*
 HaXe library written by Franco Ponticelli <franco.ponticelli@gmail.com>

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the
 distribution.

 THIS SOFTWARE IS PROVIDED BY FRANCO PONTICELLI "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL SOCIAL MEDIA NETWORKS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
package haxe.test;

import haxe.test.Dispatcher;

import Prelude;

using PreludeExtensions;
using haxe.functional.PredicateExtensions;

/**
* The Runner class performs a set of tests. The tests can be added using add or addFixtures.
* Once all the tests are register they are axecuted on the run() call.
* Note that Runner does not provide any visual output. To visualize the test results use one of
* the classes in the utest.ui package.
* @todo complete documentation
*/
class Runner {
  var fixtures(default, null) : Array<TestFixture<Dynamic>>;

  /**
  * Event object that monitors the progress of the runner.
  */
  public var onProgress(default, null) : Dispatcher<{ result : TestResult, done : Int, totals : Int }>;
  /**
  * Event object that monitors when the runner starts.
  */
  public var onStart(default, null)    : Dispatcher<Runner>;
  /**
  * Event object that monitors when the runner ends. This event takes into account async calls
  * performed during the tests.
  */
  public var onComplete(default, null) : Dispatcher<Runner>;
  /**
  * The number of fixtures registered.
  */
  public var length(default, null)      : Int;
  /**
  * Instantiates a Runner onject.
  */
  public function new() {
    fixtures   = new Array();
    onProgress = new Dispatcher();
    onStart    = new Dispatcher();
    onComplete = new Dispatcher();
    length = 0;
  }

  public function addAll(tests : Iterable<Dynamic>, prefix = "test", ?pattern : EReg): Runner {
    for (test in tests) {
      add(test, prefix, pattern);
    }
    
    return this;
  }

  /**
  * Adds a new test case.
  * @param  test: must be a not null object
  * @param  prefix: prefix for methods that are tests (defaults to "test")
  * @param  pattern: a regular expression that discriminates the names of test
  *         functions; when set, the prefix parameter is meaningless
  */
  public function add(test : Dynamic, prefix = "test", ?pattern : EReg): Runner {
    if(!Reflect.isObject(test)) throw "can't add a null object as a test case";
    
    var patternMatches = function(field: String): Option<Bool> return pattern.toOption().map(function(p) return p.match(field));
    var prefixMatches  = function(field: String): Option<Bool> return Some(field.startsWith(prefix));

    var fieldIsTest   = function(field: String) return patternMatches(field).orElseC(prefixMatches(field)).getOrElseC(false);
    var fieldIsMethod = isMethod.curry()(test);

    var testMethods = Type.getInstanceFields(Type.getClass(test)).filter(fieldIsTest.and(fieldIsMethod));
    
    var getMethodByName = addBeforeAll(test, addAfterAll(test, [testMethods.length], findMethodByName.curry()(test)));
    
    var methodFixtures = testMethods.map(function(field) {
      return new TestFixture(test, field, getMethodByName(field), 'before', 'after');
    });
    
    addFixtures(methodFixtures);
    
    return this;
  }

  public function addFixture(fixture : TestFixture<Dynamic>): Runner {
    fixtures.push(fixture);
    length++;
    
    return this;
  }
  
  public function addFixtures(fixtures : Iterable<TestFixture<Dynamic>>): Runner {
    for (fixture in fixtures) addFixture(fixture);
    
    return this;
  }

  public function getFixture(index : Int) {
    return fixtures[index];
  }

  function isMethod(test : Dynamic, name : String) {
    try {
      return Reflect.isFunction(Reflect.field(test, name));
    } catch(e : Dynamic) {
      return false;
    }
  }

  var pos : Int;
  public function run(): Runner {
    pos = 0;
    onStart.dispatch(this);
    runNext();
    
    return this;
  }

  function runNext() {
    if(fixtures.length > pos)
      runFixture(fixtures[pos++]);
    else
      onComplete.dispatch(this);
  }

  function runFixture(fixture : TestFixture<Dynamic>) {
    var handler = new TestHandler(fixture);
    handler.onComplete.add(testComplete);
    handler.execute();
  }

  function testComplete(h : TestHandler<Dynamic>) {
    onProgress.dispatch({ result : TestResult.ofHandler(h), done : pos, totals : length });
    runNext();
  }
  
  function addBeforeAll(test: Dynamic, f: String -> (Void -> Void)): String -> (Void -> Void) {
    if (Reflect.field(test, 'beforeAll') != null) {
      var beforeAll = findMethodByName(test, 'beforeAll');
      var totalTests = 0;
      
      var runBeforeAll = function() {
        ++totalTests;
        
        if (totalTests == 1) {
          beforeAll();
        }
      }
      
      return function(name) {
        var method = f(name);
        
        return function() {        
          runBeforeAll();
          
          method();
        }
      }
    }
    
    return f;
  }
  
  function addAfterAll(test: Dynamic, totalTestsHolder: Array<Int>, f: String -> (Void -> Void)): String -> (Void -> Void) {
    if (Reflect.field(test, 'afterAll') != null) {
      var afterAll = findMethodByName(test, 'afterAll');
      
      var runAfterAll = function() {
        --totalTestsHolder[0];
        
        if (totalTestsHolder[0] == 0) {
          afterAll();
        }
      }
      
      return function(name) {
        var method = f(name);
        
        return function() {        
          try {
            method();
          }
          catch (e: Dynamic) {
            runAfterAll();
          
            throw e;
          }
          
          runAfterAll();
        }
      }
    }
    
    return f;
  }
  
  static function findMethodByName(test: Dynamic, name: String): Void -> Void {
    return function() {
      var method = Reflect.field(test, name);
      if (method != null) {
        Reflect.callMethod(test, method, []);
      }
    }
  }
}