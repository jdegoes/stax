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

package haxe.text;

import Prelude;


typedef Parser<A, B> = Function<A, Either<B, A>>

class ParserExtensions {
  public static function map<A, B>(p: Parser<A, B>, f: A -> A): Parser<A, B> {
    return function(a: A) {
      return switch(p(a)) {
        case Left(v): Left(v);
        case Right(v): Right(f(v));
      }
    }
  }
  
  public static function flatMap<A, B>(p: Parser<A, B>, f: A -> Parser<A, B>): Parser<A, B> {
    return function(a: A) {
      return switch(p(a)) {
        case Left(v): Left(v);
        case Right(v): f(v);
      }
    }
  }
  
  public static function orElse<A, B>(p1: Parser<A, B>, p2: Parser<A, B>): Parser<A, B> {
    return function(a: A) {
      return switch(p1(a)) {
        case Left(v): p2(a);
        
        case Right(v): Right(v);
      }
    }
  }
  
  public static function andAlso<A, B>(p1: Parser<A, B>, p2: Parser<A, B>): Parser<A, B> {
    return function(a: A) {
      return switch(p1(a)) {
        case Left(v): Left(v);
         
        case Right(v1): switch(p2(a)) {
          case Left(v2): Left(v2);
          case Right(v2): Right(v2);
        }
      }
    }
  }
  
  public static function thenFailWith<A, B>(p: Parser<A, B>, failureValue: Thunk<B>): Parser<A, B> {
    return function(a: A) {
      return switch(p(a)) {
        case Left(v): Right(a);
        
        case Right(v): Left(failureValue());
      }
    }
  }
  
  public static function optional<A, B>(p: Parser<A, B>): Parser<A, B> {
    return function(a: A) {
      return switch(p(a)) {
        case Left(v): Right(a);
        
        case Right(v): Right(v);
      }
    }
  }
  
  public static function repeat<A, B>(p: Parser<A, B>, n: Int): Parser<A, B> {
    return function(a: A) {
      for (i in 0...n) {
        switch (p(a)) {
          case Left(v): return Left(v);
          
          case Right(v): a = v;
        }
      }
      
      return Right(a);
    }
  }
  
  public static function atLeast<A, B>(p: Parser<A, B>, n: Int): Parser<A, B> {
    return function(a: A) {
      for (i in 0...n) {
        switch (p(a)) {
          case Left(v): return Left(v);
          
          case Right(v): a = v;
        }
      }
      
      while (true) {
        switch (p(a)) {
          case Left(v): break;
          
          case Right(v): a = v;
        }
      }
      
      return Right(a);
    }
  }
  
  public static function atMost<A, B>(p: Parser<A, B>, n: Int, failureValue: Thunk<B>): Parser<A, B> {
    return function(a: A) {
      for (i in 0...n) {
        switch (p(a)) {
          case Left(v): break;
          
          case Right(v): a = v;
        }
      }
      
      return switch (p(a)) {
        case Right(v): Left(failureValue());
        
        case Left(v): Right(a);
      }
    }
  }
  
  public static function emit<T>(p: Parser<ParseInput<T>, ParseFailure>, f: ParseInput<T> -> T): Parser<ParseInput<T>, ParseFailure> {
    return function(i: ParseInput<T>) {
      return Right(i.consume(0, f(i)));
    }
  }
}


class ParseInput<T> {
  public var rest (default, null): String;
  public var data (default, null): T;
  public var row (default, null): Int;
  public var col (default, null): Int;
  public var consumed (default, null): Array<String>;  
  
  public function new(s: String, ?cons: Array<String>, ?t: T, r: Int = 0, c: Int = 0) { 
    rest = s; data = t; consumed = if (cons == null) [] else cons; row = r; col = c;
  }
  
  public function consume(n: Int, newData: T = null, tabLen: Int = 8): ParseInput<T> {
    if (newData == null) newData = data;
    
    var str = rest.substr(0, n);
    
    for (i in 0...str.length) {
      var char = str.substr(i, i + 1);
      
      if (char == "\n") { ++row; col = 0; }
      else if (char == "\r") { col = 0; }
      else if (char == "\t") { col = ((col + tabLen) / tabLen) * tabLen; }
      else { ++col; }
    }
    
    return ParseInput.create(rest.substr(n), consumed.concat([str]), newData, newRow, newCol);
  }
  
  public function fail(message: String): ParseFailure {
    return ParseFailure.create(message, row, col);
  }
  
  public static function create(s: String, ?cons: Array<String>, ?t: T, r: Int = 0, c: Int = 0): ParseInput {
    return new ParseInput(s, cons, t, r, c);
  }
}

class ParseFailure {
  public var message (default, null): String;
  
  public var row (default, null): Int;
  public var col (default, null): Int;
  
  public function new(s: String, r: Int, c: Int) { message = s; row = r; col = c; }
  
  public static function create(s: String, r: Int = 0, c: Int = 0): ParseFailure {
    return new ParseFailure(s, r, c);
  }
}