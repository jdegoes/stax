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
package haxe.test.ui;

import haxe.test.Runner;
import haxe.test.ui.common.IReport;
import haxe.test.ui.text.HtmlReport;
import haxe.test.ui.text.PrintReport;
import haxe.test.ui.common.HeaderDisplayMode;

#if php
import php.Web;
#elseif neko
import neko.Web;
#end

class Report
{
	public static function create(runner : Runner, ?displaySuccessResults : SuccessResultsDisplayMode, ?headerDisplayMode : HeaderDisplayMode) : IReport<Dynamic>
	{
		var report : IReport<Dynamic>;
#if (php || neko)
		if (!Web.isModNeko)
			report = new PrintReport(runner);
		else
			report = new HtmlReport(runner, true);
#elseif js
		report = new HtmlReport(runner, true);
#elseif flash
		if(flash.external.ExternalInterface.available)
			report = new HtmlReport(runner, true);
		else
			report = new PrintReport(runner);
#else
		report = new PrintReport(runner);
#end
		if (null == displaySuccessResults)
			report.displaySuccessResults = ShowSuccessResultsWithNoErrors;
		else
			report.displaySuccessResults = displaySuccessResults;
			
		if (null == headerDisplayMode)
			report.displayHeader = ShowHeaderWithResults;
		else
			report.displayHeader = headerDisplayMode;
			
		return report;
	}
}