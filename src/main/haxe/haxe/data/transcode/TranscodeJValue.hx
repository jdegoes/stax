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

/**
 * The extractors and decomposers in this file have been created to comply with 
 * the serialization requirements of XSchema.
 */
package haxe.data.transcode;

import Prelude;

import haxe.data.collections.List;
import haxe.data.collections.Set;
import haxe.data.collections.Map;
import haxe.data.transcode.Transcode;
import haxe.text.json.JValue;

using PreludeExtensions;
using haxe.data.transcode.TranscodeJValue;
using haxe.abstract.FoldableExtensions;
using haxe.text.json.JValueExtensions;

typedef JDecomposer<T> = Decomposer<T, JValue>
typedef JExtractor<T>  = Extractor<JValue, T>
typedef JTranscoder<T> = Transcoder<T, JValue>

class ExtractorHelpers {
  public static function extractFieldValue<T>(j: JValue, n: String, e: JExtractor<T>, def: JValue) {
    var fieldValue = j.getOrElse(n, def.toThunk());
    
    try {
      return e.extract(fieldValue);
    }
    catch (err: Dynamic) {
      return e.extract(def);
    }
  }
}