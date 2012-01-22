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
import Type;

enum Unit {
  Unit;
}

typedef AnyRef = {}
typedef CodeBlock = Void -> Void
typedef Function<P1, R> = P1 -> R
typedef Function0<R> = Void -> R
typedef Function1<P1, R> = P1 -> R
typedef Function2<P1, P2, R> = P1 -> P2 -> R
typedef Function3<P1, P2, P3, R> = P1 -> P2 -> P3 -> R
typedef Function4<P1, P2, P3, P4, R> = P1 -> P2 -> P3 -> P4 -> R
typedef Function5<P1, P2, P3, P4, P5, R> = P1 -> P2 -> P3 -> P4 -> P5 -> R
typedef Function6<P1, P2, P3, P4, P5, P6, R> = P1 -> P2 -> P3 -> P4 -> P5 -> P6 -> R
typedef Function7<P1, P2, P3, P4, P5, P6, P7, R> = P1 -> P2 -> P3 -> P4 -> P5 -> P6 -> P7 -> R
typedef Function8<P1, P2, P3, P4, P5, P6, P7, P8, R> = P1 -> P2 -> P3 -> P4 -> P5 -> P6 -> P7 -> P8 -> R
typedef Function9<P1, P2, P3, P4, P5, P6, P7, P8, P9, R> = P1 -> P2 -> P3 -> P4 -> P5 -> P6 -> P7 -> P8 -> P9 -> R
typedef Function10<P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, R> = P1 -> P2 -> P3 -> P4 -> P5 -> P6 -> P7 -> P8 -> P9 -> P10 -> R

typedef Reducer<T> = T -> T -> T

typedef Factory<T> = Void -> T

typedef Thunk<T> = Void -> T

/** An option represents an optional value -- the value may or may not be
 * present. Option is a much safer alternative to null that often enables
 * reduction in code size and increase in code clarity.
 */
enum Option<T> {
  None;
  Some(v: T);
}

/** Either represents a type that is either a "left" value or a "right" value,
 * but not both. Either is often used to represent success/failure, where the
 * left side represents failure, and the right side represents success.
 */
enum Either<A, B> {
  Left(v: A);
  Right(v: B);
}

typedef FailureOrSuccess<A, B> = Either<A, B>
typedef OrderFunction<T>  = Function2<T, T, Int>;
typedef EqualFunction<T>  = Function2<T, T, Bool>;
typedef ShowFunction<T>   = Function<T, String>;
typedef HashFunction<T> = Function<T, Int>;   

typedef CollectionTools<T> = {
		order : Null<OrderFunction<T>>,
		equal	: Null<EqualFunction<T>>,
		show	: Null<ShowFunction<T>>,
		hash	: Null<HashFunction<T>>,
}
class FieldOrder {
  public static inline var Ascending = 1;
  public static inline var Descending = -1;
  public static inline var Ignore = 0;
}
