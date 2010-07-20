/*
 HaXe library written by Franco Ponticelli <franco.ponticelli@gmail.com>

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the
 distribution.

 THIS SOFTWARE IS PROVIDED BY FRANCO PONTICELLI "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL SOCIAL MEDIA NETWORKS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
package haxe.test.ui.common;

import haxe.test.ui.common.HeaderDisplayMode;

class ReportTools
{
	public static function hasHeader(report : IReport<Dynamic>, stats : ResultStats)
	{
		switch(report.displayHeader)
		{
			case NeverShowHeader:
				return false;
			case ShowHeaderWithResults:
				if (!stats.isOk)
					return true;
				switch(report.displaySuccessResults)
				{
					case NeverShowSuccessResults:
						return false;
					case AlwaysShowSuccessResults, ShowSuccessResultsWithNoErrors:
						return true;
				}
			case AlwaysShowHeader:
				return true;
		};
	}
	
	public static function skipResult(report : IReport<Dynamic>, stats : ResultStats, isOk)
	{
		if (!stats.isOk) return false;
		return switch(report.displaySuccessResults)
		{
			case NeverShowSuccessResults: true;
			case AlwaysShowSuccessResults: false;
			case ShowSuccessResultsWithNoErrors: !isOk;
		};
	}
	
	public static function hasOutput(report : IReport<Dynamic>, stats : ResultStats)
	{
		if (!stats.isOk) return true;
		return hasHeader(report, stats);
	}
}