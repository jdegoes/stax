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

using PreludeExtensions;
using haxe.functional.FoldableExtensions;

class SignalCollection {
    private function new() { }
    

    
    public static function concatS<C, T>(b1: Signal<Collection<C, T>>, b2: Signal<Collection<C, T>>): Signal<Collection<C, T>> {
        return b1.zip(b2).map(function(c) { return cast c._1.concat(c._2); });
    }
    
    public static function join<C, T>(b: Signal<Collection<C, T>>, char: String): Signal<String> {
        return b.map(function(c) { return c.mkString(char); });
    }
    
    public static function size<C, T>(b: Signal<Collection<C, T>>): Signal<Int> {
        return b.map(function(c) { return c.size(); });
    }
    
    public static function zipS<C, T, B>(b1: Signal<List<T>>, b2: Signal<List<B>>): Signal<List<Tuple2<T, B>>> {
        return b1.zip(b2).map(function(c) { return c._1.zip(c._2); });
    }
    
    public static function append<C, T>(b: Signal<Collection<C, T>>, element: T): Signal<Collection<C, T>> {
        return b.map(function(c) { return cast c.add(element); });
    }
    
    public static function count<C, T>(b: Signal<Collection<C, T>>, predicate: T -> Bool): Signal<Int> {
        return b.map(function(c) { return c.count(predicate); });
    }
    
    public static function all<C, T>(b: Signal<Collection<C, T>>, tester: T -> Bool): Signal<Bool> {
        return b.map(function(c) { return c.forAll(tester); });
    }
    
    public static function any<C, T>(b: Signal<Collection<C, T>>, tester: T -> Bool): Signal<Bool> {
        return b.map(function(c) { return c.forAny(tester); });
    }
    
    public static function forEach<C, T>(b: Signal<Collection<C, T>>, f: T -> Void): Signal<Collection<C, T>> {
        return b.map(function(c) { return cast c.foreach(f); });
    }
    
    public static function each<C, T>(b: Signal<Collection<C, T>>, f: T -> Void): Signal<Collection<C, T>> {
        return b.map(function(c) { return cast c.foreach(f); });
    }
    
    public static function map < C, D, T, U > (b: Signal < Collection < C, T >> , f: T -> U): Signal < Collection < D, U >> {
				return b.map(function(c) { return cast c.map(f); } );
    }

    public static function mapTo<C, T, D, Z>(b: Signal<Collection<C, T>>, t: Collection<D, Z>, f: T -> Z): Signal<Collection<D, Z>> {
        return b.map(function(c) { return cast c.mapTo(t, f); });
    }
/*
    public static function mapTo<C, T, Z>(b: Signal<Collection<C, T>>, t: Collection<C, Z>, f: T -> Z): Signal<Collection<C, Z>> {
        return b.map(function(c) { return cast c.mapTo(t, f); });
    }
*/   
    public static function partition<C, T>(b: Signal<Collection<C, T>>, filter: T -> Bool): Signal<Tuple2<Collection<C, T>, Collection<C, T>>> {
        return b.map(function(c) { return cast c.partition(filter); });
    }

    public static function filter<C, T>(b: Signal<Collection<C, T>>, f: T -> Bool): Signal<Collection<C, T>> {
        return b.map(function(c) { return cast c.filter(f); });
    }
    
    public static function flatMap<C, T>(b: Signal<Collection<C, T>>, f: T -> Collection<C, T>): Signal<Collection<C, T>> {
        return b.map(function(c) { return cast c.flatMap(f); });
    }
    
    
    public static function toArray<C, T>(b: Signal<Collection<C, T>>): Signal<Array<T>> {
        return b.map(function(c) { return c.toArray(); });
    }
    
    public static function foldr<C, T, Z>(b: Signal<Collection<C, T>>, initial: Z, f: T -> Z -> Z): Signal<Z> {
        return b.map(function(c) { return cast c.foldr(initial, f); });
    }
    
    public static function foldl<C, T, Z>(b: Signal<Collection<C, T>>, initial: Z, f: Z -> T -> Z): Signal<Z> {
        return b.map(function(c) { return c.foldl(initial, f); });
    }
    /*
    public static function scanl<C, T>(b: Signal<Collection<C, T>>, initial: T, f: T -> T -> T): Signal<Collection<C, T>> {
        return b.map(function(c) { return c.scanl(initial, f); });
    }
    
    public static function scanr<C, T>(b: Signal<Collection<C, T>>, initial: T, f: T -> T -> T): Signal<Collection<C, T>> {
        return b.map(function(c) { return c.scanr(initial, f); });
    }
    
    public static function scanrP<C, T>(b: Signal<Collection<C, T>>,  f: T -> T -> T): Signal<Collection<C, T>> {
        return b.map(function(c) { return c.scanrP(f); });
    }
    
    public static function scanlP<C, T>(b: Signal<Collection<C, T>>,  f: T -> T -> T): Signal<Collection<C, T>> {
        return b.map(function(c) { return c.scanlP(f); });
    }
    
    public static function groupBy<C, T>(b: Signal<Collection<C, T>>, cmp: T -> T -> Bool): Signal<Collection<C, Collection<C, T>>> {
        return b.map(function(c) { return c.groupBy(cmp); });
    }
    
    public static function group<C, T>(b: Signal<Collection<C, T>>): Signal<Collection<C, Collection<C, T>>> {
        return b.map(function(c) { return c.group(); });
    }
    
    public static function member<C, T>(b: Signal<Collection<C, T>>, element: T): Signal<Bool> {
        return b.map(function(c) { return c.member(element); });
    }
    
    public static function exists<C, T>(b: Signal<Collection<C, T>>, cmp: T -> Bool): Signal<Bool> {
        return b.map(function(v) { return v.exists(cmp); });
    }
    
    public static function existsP<C, T>(b: Signal<Collection<C, T>>, ref, cmp: T -> T -> Bool): Signal<Bool> {
        return b.map(function(c) { return c.existsP(ref, cmp); });
    }
    
    public static function find<C, T>(b: Signal<Collection<C, T>>, cmp: T -> Bool): Signal<Option<T>> {
        return b.map(function(c) { return c.find(cmp); });
    }
    
    public static function nubBy<C, T>(b: Signal<Collection<C, T>>, cmp: T -> T -> Bool): Signal<Collection<C, T>> {
        return b.map(function(c) { return c.nubBy(cmp); });
    }
    
    public static function nub<C, T>(b: Signal<Collection<C, T>>): Signal<Collection<C, T>> {
        return b.map(function(c) { return c.nub(); });
    }
    
    public static function intersectS<C, T>(b1: Signal<Collection<C, T>>, b2: Signal<Collection<C, T>>): Signal<Collection<C, T>> {
        return b1.zip(b2).map(function(c) { return c._1.intersect(v._2); });
    }
    
    public static function intersectByS<C, T>(b1: Signal<Collection<C, T>>, b2: Signal<Collection<C, T>>, cmp: T -> T -> Bool): Signal<Collection<C, T>> {
        return b1.zip(b2).map(function(c) { return c._1.intersectBy(v._2, cmp); });
    }
    
    public static function unionByS<C, T>(b1: Signal<Collection<C, T>>, b2: Signal<Collection<C, T>>, cmp: T -> T -> Bool): Signal<Collection<C, T>> {
        return b1.zip(b2).map(function(c) { return c._1.unionBy(v._2, cmp); });
    }
    
    public static function unionS<C, T>(b1: Signal<Collection<C, T>>, b2: Signal<Collection<C, T>>): Signal<Collection<C, T>> {
        return b1.zip(b2).map(function(c) { return c._1.union(v._2); });
    }
    
    public static function isPrefixOfS<C, T>(b1: Signal<Collection<C, T>>, b2: Signal<Collection<C, T>>): Signal<Bool> {
        return b1.zip(b2).map(function(c) { return c._1.isPrefixOf(v._2); });
    }
    
    public static function isSuffixOfS<C, T>(b1: Signal<Collection<C, T>>, b2: Signal<Collection<C, T>>): Signal<Bool> {
        return b1.zip(b2).map(function(c) { return c._1.isSuffixOf(v._2); });
    }
    
    public static function delete<C, T>(b: Signal<Collection<C, T>>, val: T): Signal<Collection<C, T>> {
        return b.map(function(c) { return c.delete(val); });
    }
    
    public static function deleteBy<C, T>(b: Signal<Collection<C, T>>, val: T, cmp: T -> T -> Bool): Signal<Collection<C, T>> {
        return b.map(function(c) { return c.deleteBy(val, cmp); });
    }
    
    public static function findIndicesOf<C, T>(b: Signal<Collection<C, T>>, cmp: T -> Bool): Signal<Collection<C, Int>> {
        return b.map(function(c) { return c.findIndicesOf(cmp); });
    }
    
    public static function findIndexOf<C, T>(b: Signal<Collection<C, T>>, cmp: T -> Bool): Signal<Option<Int>> {
        return b.map(function(c) { return c.findIndexOf(cmp); });
    }
    
    public static function indexOf<C, T>(b: Signal<Collection<C, T>>, val: T): Signal<Option<Int>> {
        return b.map(function(c) { return c.indexOf(val); });
    }
    
    public static function indicesOf<C, T>(b: Signal<Collection<C, T>>, val: T): Signal<Collection<C,Int>> {
        return b.map(function(c) { return c.indicesOf(val); });
    }
    
    public static function replaceBy<C, T>(b: Signal<Collection<C, T>>, val: T, cmp: T -> Bool): Signal<Collection<C, T>> {
        return b.map(function(c) { return c.replaceBy(val, cmp); });
    }
    
    public static function snapshot<C, T>(b: Signal<Collection<C, T>>): Signal<Collection<C, T>> {
        return b.map(function(c) { return c.snapshot(); });
    }
    
    public static function insertBy<C, T>(b: Signal<Collection<C, T>>, val: T, smallerThan: T -> T -> Bool): Signal<Collection<C, T>> {
        return b.map(function(c) { return c.insertBy(val, smallerThan); });
    }
    
    public static function sort<C, T>(b: Signal<Collection<C, T>>, cmp: T -> T -> Bool): Signal<Collection<C, T>> {
        return b.map(function(c) { return c.sort(cmp); });
    }
    
    public static function deleteFirstByS<C, T>(b1: Signal<Collection<C, T>>, b2: Signal<Collection<C, T>>, cmp: T -> T -> Bool): Signal<Collection<C, T>> {
        return b1.zip(b2).map(function(c) { return c._1.deleteFirstBy(v._2, cmp); });
    }
    
    public static function tails<C, T>(b: Signal<Collection<C, T>>): Signal<Collection<C, Collection<C, T>>> {
        return b.map(function(c) { return c.tails(); });
    }
    
    public static function wrap<C, T>(b: Signal<Collection<C, T>>): Signal<Collection<C, Collection<C, T>>> {
        return b.map(function(c) { return c.wrap(); });
    }
    
    public static function toString<C, T>(b: Signal<Collection<C, T>>): Signal<String> {
        return b.map(function(c) { return c.toString(); });
    }
    
    public static function instances<C, T>(b: Signal<Collection<C, T>>, ref: T): Signal<Int> {
        return b.map(function(c) { return c.instances(ref); });
    }
    
    public static function instancesBy<C, T>(b: Signal<Collection<C, T>>, ref: T, cmp: T -> T -> Bool): Signal<Int> {
        return b.map(function(c) { return c.instancesBy(ref, cmp); });
    }
    
    public static function minusS<C, T>(b1: Signal<Collection<C, T>>, b2: Signal<Collection<C, T>>): Signal<Collection<C, T>> {
        return b1.zip(b2).map(function(c) { return c._1.minus(v._2); });
    }
    */
}