/*
 HaXe library written by Paul De Goes <paul@socialmedia.com>

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
package haxe.reactive;

import Prelude;
import haxe.reactive.Reactive;
import haxe.data.collections.Collection;
import haxe.data.collections.List;

using Prelude;
using haxe.abstract.Foldable;

class BehaviorCollection {
    private function new() { }
    

    
    public static function concatB<C, T>(b1: Behavior<Collection<C, T>>, b2: Behavior<Collection<C, T>>): Behavior<Collection<C, T>> {
        return b1.zip(b2).map(function(c) { return cast c._1.concat(c._2); });
    }
    
    public static function join<C, T>(b: Behavior<Collection<C, T>>, char: String): Behavior<String> {
        return b.map(function(c) { return c.mkString(char); });
    }
    
    public static function size<C, T>(b: Behavior<Collection<C, T>>): Behavior<Int> {
        return b.map(function(c) { return c.size; });
    }
    
    public static function zipB<C, T, B>(b1: Behavior<List<T>>, b2: Behavior<List<B>>): Behavior<List<Tuple2<T, B>>> {
        return b1.zip(b2).map(function(c) { return c._1.zip(c._2); });
    }
    
    public static function append<C, T>(b: Behavior<Collection<C, T>>, element: T): Behavior<Collection<C, T>> {
        return b.map(function(c) { return cast c.add(element); });
    }
    
    public static function count<C, T>(b: Behavior<Collection<C, T>>, predicate: T -> Bool): Behavior<Int> {
        return b.map(function(c) { return c.count(predicate); });
    }
    
    public static function all<C, T>(b: Behavior<Collection<C, T>>, tester: T -> Bool): Behavior<Bool> {
        return b.map(function(c) { return c.forAll(tester); });
    }
    
    public static function any<C, T>(b: Behavior<Collection<C, T>>, tester: T -> Bool): Behavior<Bool> {
        return b.map(function(c) { return c.forAny(tester); });
    }
    
    public static function forEach<C, T>(b: Behavior<Collection<C, T>>, f: T -> Void): Behavior<Collection<C, T>> {
        return b.map(function(c) { return cast c.foreach(f); });
    }
    
    public static function each<C, T>(b: Behavior<Collection<C, T>>, f: T -> Void): Behavior<Collection<C, T>> {
        return b.map(function(c) { return cast c.foreach(f); });
    }
    
    public static function map<C, T>(b: Behavior<Collection<C, T>>, f: T -> T): Behavior<Collection<C, T>> {
        return b.map(function(c) { return cast c.map(f); });
    }
    
    public static function mapTo<C, T, Z>(b: Behavior<Collection<C, T>>, t: Collection<C, Z>, f: T -> Z): Behavior<Collection<C, Z>> {
        return b.map(function(c) { return cast c.mapTo(t, f); });
    }
    
    public static function partition<C, T>(b: Behavior<Collection<C, T>>, filter: T -> Bool): Behavior<Tuple2<Collection<C, T>, Collection<C, T>>> {
        return b.map(function(c) { return cast c.partition(filter); });
    }

    public static function filter<C, T>(b: Behavior<Collection<C, T>>, f: T -> Bool): Behavior<Collection<C, T>> {
        return b.map(function(c) { return cast c.filter(f); });
    }
    
    public static function flatMap<C, T>(b: Behavior<Collection<C, T>>, f: T -> Collection<C, T>): Behavior<Collection<C, T>> {
        return b.map(function(c) { return cast c.flatMap(f); });
    }
    
    
    public static function toArray<C, T>(b: Behavior<Collection<C, T>>): Behavior<Array<T>> {
        return b.map(function(c) { return c.toArray(); });
    }
    
    public static function foldr<C, T, Z>(b: Behavior<Collection<C, T>>, initial: Z, f: T -> Z -> Z): Behavior<Z> {
        return b.map(function(c) { return cast c.foldr(initial, f); });
    }
    
    public static function foldl<C, T, Z>(b: Behavior<Collection<C, T>>, initial: Z, f: Z -> T -> Z): Behavior<Z> {
        return b.map(function(c) { return c.foldl(initial, f); });
    }
    
    public static function scanl<C, T>(b: Behavior<Collection<C, T>>, initial: T, f: T -> T -> T): Behavior<Collection<C, T>> {
        return b.map(function(c) { return cast c.scanl(initial, f); });
    }
    
    public static function scanr<C, T>(b: Behavior<Collection<C, T>>, initial: T, f: T -> T -> T): Behavior<Collection<C, T>> {
        return b.map(function(c) { return cast c.scanr(initial, f); });
    }
    
    public static function scanrP<C, T>(b: Behavior<Collection<C, T>>,  f: T -> T -> T): Behavior<Collection<C, T>> {
        return b.map(function(c) { return cast c.scanr1(f); });
    }
    
    public static function scanlP<C, T>(b: Behavior<Collection<C, T>>,  f: T -> T -> T): Behavior<Collection<C, T>> {
        return b.map(function(c) { return cast c.scanl1(f); });
    }
    
    public static function member<C, T>(b: Behavior<Collection<C, T>>, element: T): Behavior<Bool> {
        return b.map(function(c) { return c.member(element); });
    }
    
    public static function exists<C, T>(b: Behavior<Collection<C, T>>, cmp: T -> Bool): Behavior<Bool> {
        return b.map(function(v) { return v.exists(cmp); });
    }
    
    public static function existsP<C, T>(b: Behavior<Collection<C, T>>, ref, cmp: T -> T -> Bool): Behavior<Bool> {
        return b.map(function(c) { return c.existsP(ref, cmp); });
    }
    
    public static function find<C, T>(b: Behavior<Collection<C, T>>, cmp: T -> Bool): Behavior<Option<T>> {
        return b.map(function(c) { return c.find(cmp); });
    }
    /*
    public static function nubBy<C, T>(b: Behavior<Collection<C, T>>, cmp: T -> T -> Bool): Behavior<Collection<C, T>> {
        return b.map(function(c) { return c.nubBy(cmp); });
    }
    
    public static function nub<C, T>(b: Behavior<Collection<C, T>>): Behavior<Collection<C, T>> {
        return b.map(function(c) { return c.nub(); });
    }
    
    public static function intersectB<C, T>(b1: Behavior<Collection<C, T>>, b2: Behavior<Collection<C, T>>): Behavior<Collection<C, T>> {
        return b1.zip(b2).map(function(c) { return c._1.intersect(v._2); });
    }
    
    public static function intersectByB<C, T>(b1: Behavior<Collection<C, T>>, b2: Behavior<Collection<C, T>>, cmp: T -> T -> Bool): Behavior<Collection<C, T>> {
        return b1.zip(b2).map(function(c) { return c._1.intersectBy(v._2, cmp); });
    }
    
    public static function unionByB<C, T>(b1: Behavior<Collection<C, T>>, b2: Behavior<Collection<C, T>>, cmp: T -> T -> Bool): Behavior<Collection<C, T>> {
        return b1.zip(b2).map(function(c) { return c._1.unionBy(v._2, cmp); });
    }
    
    public static function unionB<C, T>(b1: Behavior<Collection<C, T>>, b2: Behavior<Collection<C, T>>): Behavior<Collection<C, T>> {
        return b1.zip(b2).map(function(c) { return c._1.union(v._2); });
    }
    
    public static function isPrefixOfB<C, T>(b1: Behavior<Collection<C, T>>, b2: Behavior<Collection<C, T>>): Behavior<Bool> {
        return b1.zip(b2).map(function(c) { return c._1.isPrefixOf(v._2); });
    }
    
    public static function isSuffixOfB<C, T>(b1: Behavior<Collection<C, T>>, b2: Behavior<Collection<C, T>>): Behavior<Bool> {
        return b1.zip(b2).map(function(c) { return c._1.isSuffixOf(v._2); });
    }
    
    public static function delete<C, T>(b: Behavior<Collection<C, T>>, val: T): Behavior<Collection<C, T>> {
        return b.map(function(c) { return c.delete(val); });
    }
    
    public static function deleteBy<C, T>(b: Behavior<Collection<C, T>>, val: T, cmp: T -> T -> Bool): Behavior<Collection<C, T>> {
        return b.map(function(c) { return c.deleteBy(val, cmp); });
    }
    
    public static function findIndicesOf<C, T>(b: Behavior<Collection<C, T>>, cmp: T -> Bool): Behavior<Collection<C, Int>> {
        return b.map(function(c) { return c.findIndicesOf(cmp); });
    }
    
    public static function findIndexOf<C, T>(b: Behavior<Collection<C, T>>, cmp: T -> Bool): Behavior<Option<Int>> {
        return b.map(function(c) { return c.findIndexOf(cmp); });
    }
    
    public static function indexOf<C, T>(b: Behavior<Collection<C, T>>, val: T): Behavior<Option<Int>> {
        return b.map(function(c) { return c.indexOf(val); });
    }
    
    public static function indicesOf<C, T>(b: Behavior<Collection<C, T>>, val: T): Behavior<Collection<C,Int>> {
        return b.map(function(c) { return c.indicesOf(val); });
    }
    
    public static function replaceBy<C, T>(b: Behavior<Collection<C, T>>, val: T, cmp: T -> Bool): Behavior<Collection<C, T>> {
        return b.map(function(c) { return c.replaceBy(val, cmp); });
    }
    
    public static function snapshot<C, T>(b: Behavior<Collection<C, T>>): Behavior<Collection<C, T>> {
        return b.map(function(c) { return c.snapshot(); });
    }
    
    public static function insertBy<C, T>(b: Behavior<Collection<C, T>>, val: T, smallerThan: T -> T -> Bool): Behavior<Collection<C, T>> {
        return b.map(function(c) { return c.insertBy(val, smallerThan); });
    }
    
    public static function sort<C, T>(b: Behavior<Collection<C, T>>, cmp: T -> T -> Bool): Behavior<Collection<C, T>> {
        return b.map(function(c) { return c.sort(cmp); });
    }
    
    public static function deleteFirstByB<C, T>(b1: Behavior<Collection<C, T>>, b2: Behavior<Collection<C, T>>, cmp: T -> T -> Bool): Behavior<Collection<C, T>> {
        return b1.zip(b2).map(function(c) { return c._1.deleteFirstBy(v._2, cmp); });
    }
    
    public static function tails<C, T>(b: Behavior<Collection<C, T>>): Behavior<Collection<C, Collection<C, T>>> {
        return b.map(function(c) { return c.tails(); });
    }
    
    public static function wrap<C, T>(b: Behavior<Collection<C, T>>): Behavior<Collection<C, Collection<C, T>>> {
        return b.map(function(c) { return c.wrap(); });
    }
    
    public static function toString<C, T>(b: Behavior<Collection<C, T>>): Behavior<String> {
        return b.map(function(c) { return c.toString(); });
    }
    
    public static function instances<C, T>(b: Behavior<Collection<C, T>>, ref: T): Behavior<Int> {
        return b.map(function(c) { return c.instances(ref); });
    }
    
    public static function instancesBy<C, T>(b: Behavior<Collection<C, T>>, ref: T, cmp: T -> T -> Bool): Behavior<Int> {
        return b.map(function(c) { return c.instancesBy(ref, cmp); });
    }
    
    public static function minusB<C, T>(b1: Behavior<Collection<C, T>>, b2: Behavior<Collection<C, T>>): Behavior<Collection<C, T>> {
        return b1.zip(b2).map(function(c) { return c._1.minus(v._2); });
    }
    */
}