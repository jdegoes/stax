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
    
    public static function take<C, T>(behavior: Behavior<Collection<C, T>>, n: Int): Behavior<Collection<C, T>> {
        return behavior.map(function(c) { return c.take(n); });
    }
    
    public static function drop<C, T>(behavior: Behavior<Collection<C, T>>, n: Int): Behavior<Collection<C, T>> {
        return behavior.map(function(c) { return c.drop(n); });
    }
    
    public static function concatB<C, T>(b1: Behavior<Collection<C, T>>, b2: Behavior<Collection<C, T>>): Behavior<Collection<C, T>> {
        return b1.zip(b2).map(function(v) { return v._1.concat(v._2); });
    }
    
    public static function join<C, T>(b: Behavior<Collection<C, T>>, char: String): Behavior<String> {
        return b.map(function(v) { return v.join(char); });
    }
    
    public static function size<C, T>(b: Behavior<Collection<C, T>>): Behavior<Int> {
        return b.map(function(v) { return v.size(); });
    }
    
    public static function zipB<C, T, B>(b1: Behavior<List<C, T>>, b2: Behavior<List<B>>): Behavior<List<Tuple2<T, B>>> {
        return b1.zip(b2).map(function(v) { return v._1.zip(v._2); });
    }
    
    
    public static function zip3B<C, T, B, D>(b1: Behavior<List<C, T>>, b2: Behavior<List<C, B>>, b3: Behavior<List<C, D>>): Behavior<List<Tuple3<T, B, D>>> {
        return b1.zip3(b2, b3).map(function(v) { return v._1.zip3(v._2, v._3); });
    }
    
    public static function zip4B<C, T, B, D, E>(b1: Behavior<List<C, T>>, b2: Behavior<List<C, B>>, b3: Behavior<List<C, D>>, b4: Behavior<List<C, E>>): Behavior<List<Tuple4<T, B, D, E>>> {
        return b1.zip4(b2, b3, b4).map(function(v) { return v._1.zip4(v._2, v._3, v._4); });
    }
    
    public static function zip5B<C, T, B, D, E, F>(b1: Behavior<List<C, T>>, b2: Behavior<List<C, B>>, b3: Behavior<List<C, D>>, b4: Behavior<List<C, E>>, b5: Behavior<List<C, F>>): Behavior<List<Tuple5<T, B, D, E, F>>> {
        return b1.zip5(b2, b3, b4, b5).map(function(v) { return v._1.zip5(v._2, v._3, v._4, v._5); });
    }
    
    public static function append<C, T>(b: Behavior<Collection<C, T>>, element: T): Behavior<Collection<C, T>> {
        return b.map(function(c) { return c.append(element); });
    }
    
    public static function cons<C, T>(b: Behavior<Collection<C, T>>, element: T): Behavior<Collection<C, T>> {
        return b.map(function(c) { return c.cons(element); });
    }
    
    public static function headOpt<C, T>(b: Behavior<Collection<C, T>>): Behavior<Option<T>> {
        return b.map(function(c: Collection<C, T>): Option<T> { return c.headOpt(); });
    }
    
    public static function firstOpt<C, T>(b: Behavior<Collection<C, T>>): Behavior<Option<T>> {
        return headOpt(b);
    }
    
    public static function slice<C, T>(b: Behavior<Collection<C, T>>, start: Int, ?stop: Int = null): Behavior<Collection<C, T>> {
        return b.map(function(v) { return v.slice(start, stop); });
    }
    
    public static function lastOpt<C, T>(b: Behavior<Collection<C, T>>): Behavior<Option<T>> {
        return b.map(function(v: Collection<C, T>): Option<T> { return v.lastOpt(); });
    }

    public static function countWhile<C, T>(b: Behavior<Collection<C, T>>, cmp: T -> Bool): Behavior<Int> {
        return b.map(function(v) { return v.countWhile(cmp); });
    }
    
    public static function dropWhile<C, T>(b: Behavior<Collection<C, T>>, dropper: T -> Bool): Behavior<Collection<C, T>> {
        return b.map(function(v) { return v.dropWhile(dropper); });
    }
    
    public static function takeWhile<C, T>(b: Behavior<Collection<C, T>>, taker: T -> Bool): Behavior<Collection<C, T>> {
        return b.map(function(v) { return v.takeWhile(taker); });
    }
    
    public static function count<C, T>(b: Behavior<Collection<C, T>>, predicate: T -> Bool): Behavior<Int> {
        return b.map(function(v) { return v.count(predicate); });
    }
    
    public static function all<C, T>(b: Behavior<Collection<C, T>>, tester: T -> Bool): Behavior<Bool> {
        return b.map(function(v) { return v.all(tester); });
    }
    
    public static function any<C, T>(b: Behavior<Collection<C, T>>, tester: T -> Bool): Behavior<Bool> {
        return b.map(function(v) { return v.any(tester); });
    }
    
    public static function forEach<C, T>(b: Behavior<Collection<C, T>>, f: T -> Void): Behavior<Collection<C, T>> {
        return b.map(function(v) { return v.forEach(f); });
    }
    
    public static function each<C, T>(b: Behavior<Collection<C, T>>, f: T -> Void): Behavior<Collection<C, T>> {
        return b.map(function(v) { return v.each(f); });
    }
    
    public static function map<T, Z>(b: Behavior<Collection<C, T>>, f: T -> Z): Behavior<Collection<Z>> {
        return b.map(function(v) { return v.map(f); });
    }
    
    public static function partition<C, T>(b: Behavior<Collection<C, T>>, filter: T -> Bool): Behavior<Tuple2<Collection<C, T>, Collection<C, T>>> {
        return b.map(function(v) { return v.partition(filter); });
    }
    
    public static function partitionWhile<C, T>(b: Behavior<Collection<C, T>>, filter: T -> Bool): Behavior<Tuple2<Collection<C, T>, Collection<C, T>>> {
        return b.map(function(v) { return v.partitionWhile(filter); });
    }
    
    public static function filter<C, T>(b: Behavior<Collection<C, T>>, f: T -> Bool): Behavior<Collection<C, T>> {
        return b.map(function(v) { return v.filter(f); });
    }
    
    public static function filterWhile<C, T>(b: Behavior<Collection<C, T>>, f: T -> Bool): Behavior<Collection<C, T>> {
        return b.map(function(v) { return v.filterWhile(f); });
    }
    
    public static function flatMap<T, Z>(b: Behavior<Collection<C, T>>, f: T -> Collection<Z>): Behavior<Collection<Z>> {
        return b.map(function(v) { return v.flatMap(f); });
    }
    
    public static function toArray<C, T>(b: Behavior<Collection<C, T>>): Behavior<Array<T>> {
        return b.map(function(v) { return v.toArray(); });
    }
    
    public static function foldr<T, Z>(b: Behavior<Collection<C, T>>, initial: Z, f: Z -> T -> Z): Behavior<Z> {
        return b.map(function(v) { return v.foldr(initial, f); });
    }
    
    public static function foldl<T, Z>(b: Behavior<Collection<C, T>>, initial: Z, f: Z -> T -> Z): Behavior<Z> {
        return b.map(function(v) { return v.foldl(initial, f); });
    }
    
    public static function scanl<C, T>(b: Behavior<Collection<C, T>>, initial: T, f: T -> T -> T): Behavior<Collection<C, T>> {
        return b.map(function(v) { return v.scanl(initial, f); });
    }
    
    public static function scanr<C, T>(b: Behavior<Collection<C, T>>, initial: T, f: T -> T -> T): Behavior<Collection<C, T>> {
        return b.map(function(v) { return v.scanr(initial, f); });
    }
    
    public static function scanrP<C, T>(b: Behavior<Collection<C, T>>,  f: T -> T -> T): Behavior<Collection<C, T>> {
        return b.map(function(v) { return v.scanrP(f); });
    }
    
    public static function scanlP<C, T>(b: Behavior<Collection<C, T>>,  f: T -> T -> T): Behavior<Collection<C, T>> {
        return b.map(function(v) { return v.scanlP(f); });
    }
    
    public static function groupBy<C, T>(b: Behavior<Collection<C, T>>, cmp: T -> T -> Bool): Behavior<Collection<Collection<C, T>>> {
        return b.map(function(v) { return v.groupBy(cmp); });
    }
    
    public static function group<C, T>(b: Behavior<Collection<C, T>>): Behavior<Collection<Collection<C, T>>> {
        return b.map(function(v) { return v.group(); });
    }
    
    public static function member<C, T>(b: Behavior<Collection<C, T>>, element: T): Behavior<Bool> {
        return b.map(function(v) { return v.member(element); });
    }
    
    public static function exists<C, T>(b: Behavior<Collection<C, T>>, cmp: T -> Bool): Behavior<Bool> {
        return b.map(function(v) { return v.exists(cmp); });
    }
    
    public static function existsP<C, T>(b: Behavior<Collection<C, T>>, ref, cmp: T -> T -> Bool): Behavior<Bool> {
        return b.map(function(v) { return v.existsP(ref, cmp); });
    }
    
    public static function find<C, T>(b: Behavior<Collection<C, T>>, cmp: T -> Bool): Behavior<Option<T>> {
        return b.map(function(v) { return v.find(cmp); });
    }
    
    public static function nubBy<C, T>(b: Behavior<Collection<C, T>>, cmp: T -> T -> Bool): Behavior<Collection<C, T>> {
        return b.map(function(v) { return v.nubBy(cmp); });
    }
    
    public static function nub<C, T>(b: Behavior<Collection<C, T>>): Behavior<Collection<C, T>> {
        return b.map(function(v) { return v.nub(); });
    }
    
    public static function intersectB<C, T>(b1: Behavior<Collection<C, T>>, b2: Behavior<Collection<C, T>>): Behavior<Collection<C, T>> {
        return b1.zip(b2).map(function(v) { return v._1.intersect(v._2); });
    }
    
    public static function intersectByB<C, T>(b1: Behavior<Collection<C, T>>, b2: Behavior<Collection<C, T>>, cmp: T -> T -> Bool): Behavior<Collection<C, T>> {
        return b1.zip(b2).map(function(v) { return v._1.intersectBy(v._2, cmp); });
    }
    
    public static function unionByB<C, T>(b1: Behavior<Collection<C, T>>, b2: Behavior<Collection<C, T>>, cmp: T -> T -> Bool): Behavior<Collection<C, T>> {
        return b1.zip(b2).map(function(v) { return v._1.unionBy(v._2, cmp); });
    }
    
    public static function unionB<C, T>(b1: Behavior<Collection<C, T>>, b2: Behavior<Collection<C, T>>): Behavior<Collection<C, T>> {
        return b1.zip(b2).map(function(v) { return v._1.union(v._2); });
    }
    
    public static function isPrefixOfB<C, T>(b1: Behavior<Collection<C, T>>, b2: Behavior<Collection<C, T>>): Behavior<Bool> {
        return b1.zip(b2).map(function(v) { return v._1.isPrefixOf(v._2); });
    }
    
    public static function isSuffixOfB<C, T>(b1: Behavior<Collection<C, T>>, b2: Behavior<Collection<C, T>>): Behavior<Bool> {
        return b1.zip(b2).map(function(v) { return v._1.isSuffixOf(v._2); });
    }
    
    public static function delete<C, T>(b: Behavior<Collection<C, T>>, val: T): Behavior<Collection<C, T>> {
        return b.map(function(v) { return v.delete(val); });
    }
    
    public static function deleteBy<C, T>(b: Behavior<Collection<C, T>>, val: T, cmp: T -> T -> Bool): Behavior<Collection<C, T>> {
        return b.map(function(v) { return v.deleteBy(val, cmp); });
    }
    
    public static function findIndicesOf<C, T>(b: Behavior<Collection<C, T>>, cmp: T -> Bool): Behavior<Collection<Int>> {
        return b.map(function(v) { return v.findIndicesOf(cmp); });
    }
    
    public static function findIndexOf<C, T>(b: Behavior<Collection<C, T>>, cmp: T -> Bool): Behavior<Option<Int>> {
        return b.map(function(v) { return v.findIndexOf(cmp); });
    }
    
    public static function indexOf<C, T>(b: Behavior<Collection<C, T>>, val: T): Behavior<Option<Int>> {
        return b.map(function(v) { return v.indexOf(val); });
    }
    
    public static function indicesOf<C, T>(b: Behavior<Collection<C, T>>, val: T): Behavior<Collection<Int>> {
        return b.map(function(v) { return v.indicesOf(val); });
    }
    
    public static function replaceBy<C, T>(b: Behavior<Collection<C, T>>, val: T, cmp: T -> Bool): Behavior<Collection<C, T>> {
        return b.map(function(v) { return v.replaceBy(val, cmp); });
    }
    
    public static function snapshot<C, T>(b: Behavior<Collection<C, T>>): Behavior<Collection<C, T>> {
        return b.map(function(v) { return v.snapshot(); });
    }
    
    public static function insertBy<C, T>(b: Behavior<Collection<C, T>>, val: T, smallerThan: T -> T -> Bool): Behavior<Collection<C, T>> {
        return b.map(function(v) { return v.insertBy(val, smallerThan); });
    }
    
    public static function sort<C, T>(b: Behavior<Collection<C, T>>, cmp: T -> T -> Bool): Behavior<Collection<C, T>> {
        return b.map(function(v) { return v.sort(cmp); });
    }
    
    public static function deleteFirstByB<C, T>(b1: Behavior<Collection<C, T>>, b2: Behavior<Collection<C, T>>, cmp: T -> T -> Bool): Behavior<Collection<C, T>> {
        return b1.zip(b2).map(function(v) { return v._1.deleteFirstBy(v._2, cmp); });
    }
    
    public static function tails<C, T>(b: Behavior<Collection<C, T>>): Behavior<Collection<Collection<C, T>>> {
        return b.map(function(v) { return v.tails(); });
    }
    
    public static function wrap<C, T>(b: Behavior<Collection<C, T>>): Behavior<Collection<Collection<C, T>>> {
        return b.map(function(v) { return v.wrap(); });
    }
    
    public static function toString<C, T>(b: Behavior<Collection<C, T>>): Behavior<String> {
        return b.map(function(v) { return v.toString(); });
    }
    
    public static function instances<C, T>(b: Behavior<Collection<C, T>>, ref: T): Behavior<Int> {
        return b.map(function(v) { return v.instances(ref); });
    }
    
    public static function instancesBy<C, T>(b: Behavior<Collection<C, T>>, ref: T, cmp: T -> T -> Bool): Behavior<Int> {
        return b.map(function(v) { return v.instancesBy(ref, cmp); });
    }
    
    public static function minusB<C, T>(b1: Behavior<Collection<C, T>>, b2: Behavior<Collection<C, T>>): Behavior<Collection<C, T>> {
        return b1.zip(b2).map(function(v) { return v._1.minus(v._2); });
    }
}