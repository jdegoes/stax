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

using Prelude;
using haxe.abstract.Foldable;

class BehaviorCollection {
    private function new() { }
    
    public static function take<T>(behavior: Behavior<Collection<T>>, n: Int): Behavior<Collection<T>> {
        return behavior.map(function(i) { return i.take(n); });
    }
    
    public static function drop<T>(behavior: Behavior<Collection<T>>, n: Int): Behavior<Collection<T>> {
        return behavior.map(function(i) { return i.drop(n); });
    }
    
    public static function concatB<T>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<T>>): Behavior<Collection<T>> {
        return b1.zip(b2).map(function(v) { return v._1.concat(v._2); });
    }
    
    public static function join<T>(b: Behavior<Collection<T>>, char: String): Behavior<String> {
        return b.map(function(v) { return v.join(char); });
    }
    
    public static function size<T>(b: Behavior<Collection<T>>): Behavior<Int> {
        return b.map(function(v) { return v.size(); });
    }
    
    public static function zipB<T, B>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<B>>): Behavior<Collection<Tuple2<T, B>>> {
        return b1.zip(b2).map(function(v) { return v._1.zip(v._2); });
    }
    
    public static function zip3B<T, B, C>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<B>>, b3: Behavior<Collection<C>>): Behavior<Collection<Tuple3<T, B, C>>> {
        return b1.zip3(b2, b3).map(function(v) { return v._1.zip3(v._2, v._3); });
    }
    
    public static function zip4B<T, B, C, D>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<B>>, b3: Behavior<Collection<C>>, b4: Behavior<Collection<D>>): Behavior<Collection<Tuple4<T, B, C, D>>> {
        return b1.zip4(b2, b3, b4).map(function(v) { return v._1.zip4(v._2, v._3, v._4); });
    }
    
    public static function zip5B<T, B, C, D, E>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<B>>, b3: Behavior<Collection<C>>, b4: Behavior<Collection<D>>, b5: Behavior<Collection<E>>): Behavior<Collection<Tuple5<T, B, C, D, E>>> {
        return b1.zip5(b2, b3, b4, b5).map(function(v) { return v._1.zip5(v._2, v._3, v._4, v._5); });
    }
    
    public static function append<T>(b: Behavior<Collection<T>>, element: T): Behavior<Collection<T>> {
        return b.map(function(v) { return v.append(element); });
    }
    
    public static function cons<T>(b: Behavior<Collection<T>>, element: T): Behavior<Collection<T>> {
        return b.map(function(v) { return v.cons(element); });
    }
    
    public static function headOpt<T>(b: Behavior<Collection<T>>): Behavior<Option<T>> {
        return b.map(function(v: Collection<T>): Option<T> { return v.headOpt(); });
    }
    
    public static function firstOpt<T>(b: Behavior<Collection<T>>): Behavior<Option<T>> {
        return headOpt(b);
    }
    
    public static function slice<T>(b: Behavior<Collection<T>>, start: Int, ?stop: Int = null): Behavior<Collection<T>> {
        return b.map(function(v) { return v.slice(start, stop); });
    }
    
    public static function lastOpt<T>(b: Behavior<Collection<T>>): Behavior<Option<T>> {
        return b.map(function(v: Collection<T>): Option<T> { return v.lastOpt(); });
    }

    public static function countWhile<T>(b: Behavior<Collection<T>>, cmp: T -> Bool): Behavior<Int> {
        return b.map(function(v) { return v.countWhile(cmp); });
    }
    
    public static function dropWhile<T>(b: Behavior<Collection<T>>, dropper: T -> Bool): Behavior<Collection<T>> {
        return b.map(function(v) { return v.dropWhile(dropper); });
    }
    
    public static function takeWhile<T>(b: Behavior<Collection<T>>, taker: T -> Bool): Behavior<Collection<T>> {
        return b.map(function(v) { return v.takeWhile(taker); });
    }
    
    public static function count<T>(b: Behavior<Collection<T>>, predicate: T -> Bool): Behavior<Int> {
        return b.map(function(v) { return v.count(predicate); });
    }
    
    public static function all<T>(b: Behavior<Collection<T>>, tester: T -> Bool): Behavior<Bool> {
        return b.map(function(v) { return v.all(tester); });
    }
    
    public static function any<T>(b: Behavior<Collection<T>>, tester: T -> Bool): Behavior<Bool> {
        return b.map(function(v) { return v.any(tester); });
    }
    
    public static function forEach<T>(b: Behavior<Collection<T>>, f: T -> Void): Behavior<Collection<T>> {
        return b.map(function(v) { return v.forEach(f); });
    }
    
    public static function each<T>(b: Behavior<Collection<T>>, f: T -> Void): Behavior<Collection<T>> {
        return b.map(function(v) { return v.each(f); });
    }
    
    public static function map<T, Z>(b: Behavior<Collection<T>>, f: T -> Z): Behavior<Collection<Z>> {
        return b.map(function(v) { return v.map(f); });
    }
    
    public static function map2B<T, Z, A>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<A>>, f: T -> A -> Z): Behavior<Collection<Z>> {
        return b1.zip(b2).map(function(v) { return v._1.map2(v._2, f); });
    }
    
    public static function map3B<T, Z, A, B>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<A>>, b3: Behavior<Collection<B>>, f: T -> A -> B -> Z): Behavior<Collection<Z>> {
        return b1.zip3(b2, b3).map(function(v) { return v._1.map3(v._2, v._3, f); });
    }
    
    public static function map4B<T, Z, A, B, C>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<A>>, b3: Behavior<Collection<B>>, b4: Behavior<Collection<C>>, f: T -> A -> B -> C -> Z): Behavior<Collection<Z>> {
        return b1.zip4(b2, b3, b4).map(function(v) { return v._1.map4(v._2, v._3, v._4, f); });
    }
    
    public static function map5B<T, Z, A, B, C, D>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<A>>, b3: Behavior<Collection<B>>, b4: Behavior<Collection<C>>,b5: Behavior<Collection<D>>, f: T -> A -> B -> C -> D -> Z): Behavior<Collection<Z>> {
        return b1.zip5(b2, b3, b4, b5).map(function(v) { return v._1.map5(v._2, v._3, v._4, v._5, f); });
    }
    
    public static function partition<T>(b: Behavior<Collection<T>>, filter: T -> Bool): Behavior<Tuple2<Collection<T>, Collection<T>>> {
        return b.map(function(v) { return v.partition(filter); });
    }
    
    public static function partitionWhile<T>(b: Behavior<Collection<T>>, filter: T -> Bool): Behavior<Tuple2<Collection<T>, Collection<T>>> {
        return b.map(function(v) { return v.partitionWhile(filter); });
    }
    
    public static function transposeB<T, B>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<B>>): Behavior<Collection<Tuple2<T, B>>> {
        return zipB(b1, b2);
    }
    
    public static function transpose3B<T, B, C>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<B>>, b3: Behavior<Collection<C>>): Behavior<Collection<Tuple3<T, B, C>>> {
        return zip3B(b1, b2, b3);
    }
    
    public static function transpose4B<T, B, C, D>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<B>>, b3: Behavior<Collection<C>>, b4: Behavior<Collection<D>>): Behavior<Collection<Tuple4<T, B, C, D>>> {
        return zip4B(b1, b2, b3, b4);
    }
    
    public static function transpose5B<T, B, C, D, E>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<B>>, b3: Behavior<Collection<C>>, b4: Behavior<Collection<D>>, b5: Behavior<Collection<E>>): Behavior<Collection<Tuple5<T, B, C, D, E>>> {
        return zip5B(b1, b2, b3, b4, b5);
    }
    
    public static function filter<T>(b: Behavior<Collection<T>>, f: T -> Bool): Behavior<Collection<T>> {
        return b.map(function(v) { return v.filter(f); });
    }
    
    public static function filterWhile<T>(b: Behavior<Collection<T>>, f: T -> Bool): Behavior<Collection<T>> {
        return b.map(function(v) { return v.filterWhile(f); });
    }
    
    public static function flatMap<T, Z>(b: Behavior<Collection<T>>, f: T -> Collection<Z>): Behavior<Collection<Z>> {
        return b.map(function(v) { return v.flatMap(f); });
    }
    
    public static function flatMap2B<T, Z, B>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<B>>, f: T -> B -> Collection<Z>): Behavior<Collection<Z>> {
        return b1.zip(b2).map(function(v) { return v._1.flatMap2(v._2, f); });
    }

    public static function flatMap3B<T, Z, B, C>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<B>>, b3: Behavior<Collection<C>>, f: T -> B -> C -> Collection<Z>): Behavior<Collection<Z>> {
        return b1.zip3(b2, b3).map(function(v) { return v._1.flatMap3(v._2, v._3, f); });
    }
    
    public static function flatMap4B<T, Z, B, C, D>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<B>>, b3: Behavior<Collection<C>>, b4: Behavior<Collection<D>>, f: T -> B -> C -> D -> Collection<Z>): Behavior<Collection<Z>> {
        return b1.zip4(b2, b3, b4).map(function(v) { return v._1.flatMap4(v._2, v._3, v._4, f); });
    }
    
    public static function flatMap5B<T, Z, B, C, D, E>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<B>>, b3: Behavior<Collection<C>>, b4: Behavior<Collection<D>>, b5: Behavior<Collection<E>>, f: T -> B -> C -> D -> E -> Collection<Z>): Behavior<Collection<Z>> {
        return b1.zip5(b2, b3, b4, b5).map(function(v) { return v._1.flatMap5(v._2, v._3, v._4, v._5, f); });
    }
    
    public static function toArray<T>(b: Behavior<Collection<T>>): Behavior<Array<T>> {
        return b.map(function(v) { return v.toArray(); });
    }
    
    public static function foldr<T, Z>(b: Behavior<Collection<T>>, initial: Z, f: Z -> T -> Z): Behavior<Z> {
        return b.map(function(v) { return v.foldr(initial, f); });
    }
    
    public static function foldl<T, Z>(b: Behavior<Collection<T>>, initial: Z, f: Z -> T -> Z): Behavior<Z> {
        return b.map(function(v) { return v.foldl(initial, f); });
    }
    
    public static function foldl2B<T, Z, B>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<B>>, initial: Z, f: Z -> T -> B -> Z): Behavior<Z> {
        return b1.zip(b2).map(function(v) { return v._1.foldl2(v._2, initial, f); });
    }
    
    public static function foldl3B<T, Z, B, C>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<B>>, b3: Behavior<Collection<C>>, initial: Z, f: Z -> T -> B -> C -> Z): Behavior<Z> {
        return b1.zip3(b2, b3).map(function(v) { return v._1.foldl3(v._2, v._3, initial, f); });
    }
    
    public static function foldl4B<T, Z, B, C, D>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<B>>, b3: Behavior<Collection<C>>, b4: Behavior<Collection<D>>, initial: Z, f: Z -> T -> B -> C -> D -> Z): Behavior<Z> {
        return b1.zip4(b2, b3, b4).map(function(v) { return v._1.foldl4(v._2, v._3, v._4, initial, f); });
    }
    
    public static function foldl5B<T, Z, B, C, D, E>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<B>>, b3: Behavior<Collection<C>>, b4: Behavior<Collection<D>>, b5: Behavior<Collection<E>>, initial: Z, f: Z -> T -> B -> C -> D -> E -> Z): Behavior<Z> {
        return b1.zip5(b2, b3, b4, b5).map(function(v) { return v._1.foldl5(v._2, v._3, v._4, v._5, initial, f); });
    }
    
    public static function scanl<T>(b: Behavior<Collection<T>>, initial: T, f: T -> T -> T): Behavior<Collection<T>> {
        return b.map(function(v) { return v.scanl(initial, f); });
    }
    
    public static function scanr<T>(b: Behavior<Collection<T>>, initial: T, f: T -> T -> T): Behavior<Collection<T>> {
        return b.map(function(v) { return v.scanr(initial, f); });
    }
    
    public static function scanrP<T>(b: Behavior<Collection<T>>,  f: T -> T -> T): Behavior<Collection<T>> {
        return b.map(function(v) { return v.scanrP(f); });
    }
    
    public static function scanlP<T>(b: Behavior<Collection<T>>,  f: T -> T -> T): Behavior<Collection<T>> {
        return b.map(function(v) { return v.scanlP(f); });
    }
    
    public static function groupBy<T>(b: Behavior<Collection<T>>, cmp: T -> T -> Bool): Behavior<Collection<Collection<T>>> {
        return b.map(function(v) { return v.groupBy(cmp); });
    }
    
    public static function group<T>(b: Behavior<Collection<T>>): Behavior<Collection<Collection<T>>> {
        return b.map(function(v) { return v.group(); });
    }
    
    public static function member<T>(b: Behavior<Collection<T>>, element: T): Behavior<Bool> {
        return b.map(function(v) { return v.member(element); });
    }
    
    public static function exists<T>(b: Behavior<Collection<T>>, cmp: T -> Bool): Behavior<Bool> {
        return b.map(function(v) { return v.exists(cmp); });
    }
    
    public static function existsP<T>(b: Behavior<Collection<T>>, ref, cmp: T -> T -> Bool): Behavior<Bool> {
        return b.map(function(v) { return v.existsP(ref, cmp); });
    }
    
    public static function find<T>(b: Behavior<Collection<T>>, cmp: T -> Bool): Behavior<Option<T>> {
        return b.map(function(v) { return v.find(cmp); });
    }
    
    public static function nubBy<T>(b: Behavior<Collection<T>>, cmp: T -> T -> Bool): Behavior<Collection<T>> {
        return b.map(function(v) { return v.nubBy(cmp); });
    }
    
    public static function nub<T>(b: Behavior<Collection<T>>): Behavior<Collection<T>> {
        return b.map(function(v) { return v.nub(); });
    }
    
    public static function intersectB<T>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<T>>): Behavior<Collection<T>> {
        return b1.zip(b2).map(function(v) { return v._1.intersect(v._2); });
    }
    
    public static function intersectByB<T>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<T>>, cmp: T -> T -> Bool): Behavior<Collection<T>> {
        return b1.zip(b2).map(function(v) { return v._1.intersectBy(v._2, cmp); });
    }
    
    public static function unionByB<T>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<T>>, cmp: T -> T -> Bool): Behavior<Collection<T>> {
        return b1.zip(b2).map(function(v) { return v._1.unionBy(v._2, cmp); });
    }
    
    public static function unionB<T>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<T>>): Behavior<Collection<T>> {
        return b1.zip(b2).map(function(v) { return v._1.union(v._2); });
    }
    
    public static function isPrefixOfB<T>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<T>>): Behavior<Bool> {
        return b1.zip(b2).map(function(v) { return v._1.isPrefixOf(v._2); });
    }
    
    public static function isSuffixOfB<T>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<T>>): Behavior<Bool> {
        return b1.zip(b2).map(function(v) { return v._1.isSuffixOf(v._2); });
    }
    
    public static function delete<T>(b: Behavior<Collection<T>>, val: T): Behavior<Collection<T>> {
        return b.map(function(v) { return v.delete(val); });
    }
    
    public static function deleteBy<T>(b: Behavior<Collection<T>>, val: T, cmp: T -> T -> Bool): Behavior<Collection<T>> {
        return b.map(function(v) { return v.deleteBy(val, cmp); });
    }
    
    public static function findIndicesOf<T>(b: Behavior<Collection<T>>, cmp: T -> Bool): Behavior<Collection<Int>> {
        return b.map(function(v) { return v.findIndicesOf(cmp); });
    }
    
    public static function findIndexOf<T>(b: Behavior<Collection<T>>, cmp: T -> Bool): Behavior<Option<Int>> {
        return b.map(function(v) { return v.findIndexOf(cmp); });
    }
    
    public static function indexOf<T>(b: Behavior<Collection<T>>, val: T): Behavior<Option<Int>> {
        return b.map(function(v) { return v.indexOf(val); });
    }
    
    public static function indicesOf<T>(b: Behavior<Collection<T>>, val: T): Behavior<Collection<Int>> {
        return b.map(function(v) { return v.indicesOf(val); });
    }
    
    public static function replaceBy<T>(b: Behavior<Collection<T>>, val: T, cmp: T -> Bool): Behavior<Collection<T>> {
        return b.map(function(v) { return v.replaceBy(val, cmp); });
    }
    
    public static function snapshot<T>(b: Behavior<Collection<T>>): Behavior<Collection<T>> {
        return b.map(function(v) { return v.snapshot(); });
    }
    
    public static function insertBy<T>(b: Behavior<Collection<T>>, val: T, smallerThan: T -> T -> Bool): Behavior<Collection<T>> {
        return b.map(function(v) { return v.insertBy(val, smallerThan); });
    }
    
    public static function sort<T>(b: Behavior<Collection<T>>, cmp: T -> T -> Bool): Behavior<Collection<T>> {
        return b.map(function(v) { return v.sort(cmp); });
    }
    
    public static function deleteFirstByB<T>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<T>>, cmp: T -> T -> Bool): Behavior<Collection<T>> {
        return b1.zip(b2).map(function(v) { return v._1.deleteFirstBy(v._2, cmp); });
    }
    
    public static function tails<T>(b: Behavior<Collection<T>>): Behavior<Collection<Collection<T>>> {
        return b.map(function(v) { return v.tails(); });
    }
    
    public static function wrap<T>(b: Behavior<Collection<T>>): Behavior<Collection<Collection<T>>> {
        return b.map(function(v) { return v.wrap(); });
    }
    
    public static function toString<T>(b: Behavior<Collection<T>>): Behavior<String> {
        return b.map(function(v) { return v.toString(); });
    }
    
    public static function instances<T>(b: Behavior<Collection<T>>, ref: T): Behavior<Int> {
        return b.map(function(v) { return v.instances(ref); });
    }
    
    public static function instancesBy<T>(b: Behavior<Collection<T>>, ref: T, cmp: T -> T -> Bool): Behavior<Int> {
        return b.map(function(v) { return v.instancesBy(ref, cmp); });
    }
    
    public static function minusB<T>(b1: Behavior<Collection<T>>, b2: Behavior<Collection<T>>): Behavior<Collection<T>> {
        return b1.zip(b2).map(function(v) { return v._1.minus(v._2); });
    }
}