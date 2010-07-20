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
package haxe.io.log;

import Prelude;
import haxe.test.TestCase;
import haxe.io.log.Logger;

using Prelude;

class LoggerTestCase extends TestCase {
  public function testLogDebug() {
    Logger.defaultLevel = Debug;
    
    var self = this;
    
    doTest(
      function(level, text, p) {
        switch (level) {
          case Debug: self.assertEquals('hi', text);
          
          default: self.assertTrue(false);
        }
      },
      function(logger) {
        logger.debug('hi');
      }
    );
  }
  
  public function testLogInfo() {
    Logger.defaultLevel = Info;
    
    var self = this;
    
    doTest(
      function(level, text, p) {
        switch (level) {
          case Info: self.assertEquals('hi', text);
          
          default: self.assertTrue(false);
        }
      },
      function(logger) {
        logger.info('hi');
        logger.debug('bye');
      }
    );
  }
  
  public function testLogWarning() {
    Logger.defaultLevel = Warning;
    
    var self = this;
    
    doTest(
      function(level, text, p) {
        switch (level) {
          case Warning: self.assertEquals('hi', text);
          
          default: self.assertTrue(false);
        }
      },
      function(logger) {
        logger.warning('hi');
        logger.info('bye');
      }
    );
  }
  
  public function testLogError() {
    Logger.defaultLevel = Error;
    
    var self = this;
    
    doTest(
      function(level, text, p) {
        switch (level) {
          case Error: self.assertEquals('hi', text);
          
          default: self.assertTrue(false);
        }
      },
      function(logger) {
        logger.error('hi');
        logger.warning('bye');
      }
    );
  }
  
  public function testLogFatal() {
    Logger.defaultLevel = Fatal;
    
    var self = this;
    
    doTest(
      function(level, text, p) {
        switch (level) {
          case Fatal: self.assertEquals('hi', text);
          
          default: self.assertTrue(false);
        }
      },
      function(logger) {
        logger.fatal('hi');
        logger.error('bye');
      }
    );
  }
  
  private function doTest(handler: LogHandler, f: LoggerFacade -> Void) {
    var invoked = false;
    
    Logger.defaultHandlers.push(function(l, t, p) { handler(l, t, p); invoked = true; });
    
    f(Logger.get());
    
    Logger.defaultHandlers.pop();
    
    assertTrue(invoked);
  }
}