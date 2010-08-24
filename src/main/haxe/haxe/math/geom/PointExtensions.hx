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

import haxe.math.geom.Point;
import haxe.math.geom.Vector;

class Point2dIntExtensions {
  public static inline function minus(p1: Point2d<Int>, p2: Point2d<Int>): Vector2d<Int> {
    return {
      dx: p1.x - p2.x,
      dy: p1.y - p2.y
    }
  }
  
  public static inline function plus(p: Point2d<Int>, v: Vector2d<Int>): Point2d<Int> {
    return {
      x: p.x + v.dx,
      y: p.y + v.dy
    }
  }
  
  public static inline function toVector(p: Point2d<Int>): Vector2d<Int> {
    return {
      dx: p.x,
      dy: p.y
    }
  }
}

class Point2dFloatExtensions {
  public static inline function minus(p1: Point2d<Float>, p2: Point2d<Float>): Vector2d<Float> {
    return {
      dx: p1.x - p2.x,
      dy: p1.y - p2.y
    }
  }
  
  public static inline function plus(p: Point2d<Float>, v: Vector2d<Float>): Point2d<Float> {
    return {
      x: p.x + v.dx,
      y: p.y + v.dy
    }
  }
  
  public static inline function toVector(p: Point2d<Float>): Vector2d<Float> {
    return {
      dx: p.x,
      dy: p.y
    }
  }
}