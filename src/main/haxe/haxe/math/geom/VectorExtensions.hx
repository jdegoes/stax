/*
 HaXe library written by John A. De Goes <john@socialmedia.com>

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
package haxe.math.geom;

import haxe.math.geom.Vector;
import haxe.math.geom.Point;

using PreludeExtensions;

class Vector2dIntExtensions {
  public static inline function minus(v1: Vector2d<Int>, v2: Vector2d<Int>): Vector2d<Int> {
    return {
      dx: v1.dx - v2.dx,
      dy: v1.dy - v2.dy
    }
  }
  
  public static inline function plus(v1: Vector2d<Int>, v2: Vector2d<Int>): Vector2d<Int> {
    return {
      dx: v1.dx + v2.dx,
      dy: v1.dy + v2.dy
    }
  }
  
  public static inline function times(v: Vector2d<Int>, factor: Int): Vector2d<Int> {
    return {
      dx: v.dx * factor,
      dy: v.dy * factor
    }
  }
  
  public static inline function map(v: Vector2d<Int>, f: Int -> Int, g: Int -> Int): Vector2d<Int> {
    return {
      dx: f(v.dx),
      dy: g(v.dy)
    }
  }
  
  public static inline function toPoint(v: Vector2d<Int>): Point2d<Int> {
    return {
      x: v.dx,
      y: v.dy
    }
  }
  
  public static inline function toFloat(v: Vector2d<Int>): Vector2d<Float> {
    return {
      dx: v.dx.toFloat(),
      dy: v.dy.toFloat()
    }
  }
}

class Vector2dFloatExtensions {
  public static inline function minus(v1: Vector2d<Float>, v2: Vector2d<Float>): Vector2d<Float> {
    return {
      dx: v1.dx - v2.dx,
      dy: v1.dy - v2.dy
    }
  }
  
  public static inline function plus(v1: Vector2d<Float>, v2: Vector2d<Float>): Vector2d<Float> {
    return {
      dx: v1.dx + v2.dx,
      dy: v1.dy + v2.dy
    }
  }
  
  public static inline function times(v: Vector2d<Float>, factor: Float): Vector2d<Float> {
    return {
      dx: v.dx * factor,
      dy: v.dy * factor
    }
  }
  
  public static inline function map(v: Vector2d<Float>, f: Float -> Float, g: Float -> Float): Vector2d<Float> {
    return {
      dx: f(v.dx),
      dy: g(v.dy)
    }
  }
  
  public static inline function toPoint(v: Vector2d<Float>): Point2d<Float> {
    return {
      x: v.dx,
      y: v.dy
    }
  }
  
  public static inline function toInt(v: Vector2d<Float>): Vector2d<Int> {
    return {
      dx: v.dx.round(),
      dy: v.dy.round()
    }
  }
}