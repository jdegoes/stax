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
package haxe.data.transcode;

typedef Extractor<I, O> = {
  extract: I -> O
}

typedef Decomposer<I, O> = {
  decompose: I -> O
}

typedef Transcoder<A, B> = {
  extract:   B -> A,  
  decompose: A -> B
}

class ExtractorTypeclass {
  public static function create<I, O>(e: { extract: I -> O }): Extractor<I, O> {
    return {
      extract:  e.extract
    }
  }
}
class DecomposerTypeclass {
  public static function create<I, O>(e: { decompose: I -> O }): Decomposer<I, O> {
    return {
      decompose:  e.decompose
    }
  }
}
class TranscoderTypeclass {
  public static function create<A, B>(d: Decomposer<A, B>, e: Extractor<B, A>): Transcoder<A, B> {
    return {
      decompose:  d.decompose,
      extract:    e.extract
    }
  }
}