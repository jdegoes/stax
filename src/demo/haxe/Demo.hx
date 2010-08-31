
import Prelude;
import Dom;
import js.Env;
import js.io.IFrameIO;
import js.dom.Quirks;
import js.detect.BrowserSupport;
import haxe.framework.Injector;
import haxe.time.ScheduledExecutor;

using PreludeExtensions;
using js.dom.HTMLDocumentExtensions;

class Demo {
  public static function iframeDemo() {
    var IframeTemplate = '
      <html>
        <body>
          <div id="div"></div>
          <textarea id="textarea" rows="5" cols="20"></textarea>
          <input id="button" type="button" value="Send">
        </body>
      </html>
    ';
    
    var window1: Window;
    var window2: Window;

    var iframeIO1: IFrameIO;
    var iframeIO2: IFrameIO;

	  var d = Env.document;

	  var body = d.getElementsByTagName('body')[0];

	  var iframe1: HTMLIFrameElement = Env.document.newIframe(300, 250);
	  var iframe2: HTMLIFrameElement = Env.document.newIframe(300, 250);

    body.appendChild(iframe1);
    body.appendChild(iframe2);

	  var doc1: HTMLDocument = Quirks.getIframeDocument(iframe1);
	  var doc2: HTMLDocument = Quirks.getIframeDocument(iframe2);
	  
	  doc1.open();
	  doc1.write(IframeTemplate);
	  doc1.close();
	  
	  doc2.open();
	  doc2.write(IframeTemplate);
	  doc2.close();

	  window1 = Quirks.getIframeWindow(iframe1);
	  window2 = Quirks.getIframeWindow(iframe2);
	  
	  iframeIO1 = new IFrameIOAutoDetect(window1);
	  iframeIO2 = new IFrameIOAutoDetect(window2);
	  
	  var div1 = doc1.getElementById('div');
	  var div2 = doc2.getElementById('div');
	  
	  var textarea1: HTMLTextAreaElement = cast doc1.getElementById('textarea');
	  var textarea2: HTMLTextAreaElement = cast doc2.getElementById('textarea');
	  
	  var button1 = doc1.getElementById('button');
	  var button2 = doc2.getElementById('button');
	  
	  iframeIO1.receive(function(data) {
	    div1.innerHTML += data;
	  }, window2.location.href, window2);
	  
	  iframeIO2.receive(function(data) {
	    div2.innerHTML += data;
	  }, window1.location.href, window1);
	  
	  button1.onclick = function(e) {
	    iframeIO1.send(textarea1.value, window2.location.href, window2);
	    
	    textarea1.value = '';
	  };
	  
	  button2.onclick = function(e) {
	    iframeIO2.send(textarea2.value, window1.location.href, window1);
	    
	    textarea2.value = '';
	  };
  }
  
  public static function browserSupportDemo() {
    Env.document.createElement('div').withEffect(function(div) {
      div.innerHTML += '<table>' +
        '<tr><td>cssTransformationSupported:</td><td>' + BrowserSupport.cssTransformationSupported() + '</td></tr>' +
        '<tr><td>elementTagnameUppercased:</td><td>' + BrowserSupport.elementTagnameUppercased() + '</td></tr>' +
        '<tr><td>positionFixed:</td><td>' + BrowserSupport.positionFixed() + '</td></tr>' +
        '<tr><td>boxModel:</td><td>' + BrowserSupport.boxModel() + '</td></tr>' +
        '<tr><td>getAttributeStyle:</td><td>' + BrowserSupport.getAttributeStyle() + '</td></tr>' +
        '<tr><td>opacity:</td><td>' + BrowserSupport.opacity() + '</td></tr>' +
        '<tr><td>cssFloat:</td><td>' + BrowserSupport.cssFloat() + '</td></tr>' +
        '<tr><td>checkboxValueDefaultsToOn:</td><td>' + BrowserSupport.checkboxValueDefaultsToOn() + '</td></tr>' +
        '<tr><td>defaultSelectedHasSelectProperty:</td><td>' + BrowserSupport.defaultSelectedHasSelectProperty() + '</td></tr>' +
        '<tr><td>offsetAddsBorderForTableAndCells:</td><td>' + BrowserSupport.offsetAddsBorderForTableAndCells() + '</td></tr>' +
        '<tr><td>offsetDoesNotIncludeMarginInBodyOffset:</td><td>' + BrowserSupport.offsetDoesNotIncludeMarginInBodyOffset() + '</td></tr>' +
        '<tr><td>offsetDoesNotAddBorder:</td><td>' + BrowserSupport.offsetDoesNotAddBorder() + '</td></tr>' +
        '<tr><td>offsetSubtractsBorderForOverflowNotVisible:</td><td>' + BrowserSupport.offsetSubtractsBorderForOverflowNotVisible() + '</td></tr>' +
        '<tr><td>spuriousTbodyInsertedBug:</td><td>' + BrowserSupport.spuriousTbodyInsertedBug() + '</td></tr>' +
        '<tr><td>whitespaceDroppedWithInnerHTMLBug:</td><td>' + BrowserSupport.whitespaceDroppedWithInnerHTMLBug() + '</td></tr>' +
        '<tr><td>linksDroppedWithInnerHTMLBug:</td><td>' + BrowserSupport.linksDroppedWithInnerHTMLBug() + '</td></tr>' +
        '<tr><td>hrefIsNormalizedBug:</td><td>' + BrowserSupport.hrefIsNormalizedBug() + '</td></tr>' +
        '<tr><td>isEventSrcelementPresent:</td><td>' + BrowserSupport.isEventSrcelementPresent() + '</td></tr>' +
        '<tr><td>isNativeHasAttributePresent:</td><td>' + BrowserSupport.isNativeHasAttributePresent() + '</td></tr>' +
        '<tr><td>isContextMenuEventSupported:</td><td>' + BrowserSupport.isContextMenuEventSupported() + '</td></tr>' +
        '<tr><td>computedStyleReturnsValuesForStaticlyPositionedElements:</td><td>' + BrowserSupport.computedStyleReturnsValuesForStaticlyPositionedElements() + '</td></tr>' +
        '<tr><td>isRgbaSupported:</td><td>' + BrowserSupport.isRgbaSupported() + '</td></tr>' +
        '<tr><td>isCssBorderRadiusSupported:</td><td>' + BrowserSupport.isCssBorderRadiusSupported() + '</td></tr>' +
        '<tr><td>isCanvasSupported:</td><td>' + BrowserSupport.isCanvasSupported() + '</td></tr>' +
        '<tr><td>elemenChildrenReturnsElementNodes:</td><td>' + BrowserSupport.elemenChildrenReturnsElementNodes() + '</td></tr>' +
        '<tr><td>isCssEnabled:</td><td>' + BrowserSupport.isCssEnabled() + '</td></tr>' +
        '<tr><td>isQuirksMode:</td><td>' + BrowserSupport.isQuirksMode() + '</td></tr>' +
        '<tr><td>isContainsBuggy:</td><td>' + BrowserSupport.isContainsBuggy() + '</td></tr>' +
        '<tr><td>isActivexEnabled:</td><td>' + BrowserSupport.isActivexEnabled() + '</td></tr>' +
        '<tr><td>typeofNodelistIsFunctionBug:</td><td>' + BrowserSupport.typeofNodelistIsFunctionBug() + '</td></tr>' +
        '<tr><td>getElementsByTagNameReturnsCommentNodesBug:</td><td>' + BrowserSupport.getElementsByTagNameReturnsCommentNodesBug() + '</td></tr>' +
        '<tr><td>setAttributeIgnoresNameAttributeBug:</td><td>' + BrowserSupport.setAttributeIgnoresNameAttributeBug() + '</td></tr>' +
        '<tr><td>elementPropertiesAreAttributesBug:</td><td>' + BrowserSupport.elementPropertiesAreAttributesBug() + '</td></tr>' +
        '<tr><td>isRegexpWhitespaceCharacterClassBug:</td><td>' + BrowserSupport.isRegexpWhitespaceCharacterClassBug() + '</td></tr>' +
        '<tr><td>isStringPrototypeSplitRegexpBug:</td><td>' + BrowserSupport.isStringPrototypeSplitRegexpBug() + '</td></tr>' +
        '<tr><td>preElementsIgnoreNewLinesBug:</td><td>' + BrowserSupport.preElementsIgnoreNewLinesBug() + '</td></tr>' +
        '<tr><td>selectElementInnerHtmlBug:</td><td>' + BrowserSupport.selectElementInnerHtmlBug() + '</td></tr>' +
        '<tr><td>tableElementInnerHtmlBug:</td><td>' + BrowserSupport.tableElementInnerHtmlBug() + '</td></tr>' +
        '<tr><td>scriptElementRejectsTextNodeAppendingBug:</td><td>' + BrowserSupport.scriptElementRejectsTextNodeAppendingBug() + '</td></tr>' +
        '<tr><td>documentGetElementByIdConfusesIdsWithNamesBug:</td><td>' + BrowserSupport.documentGetElementByIdConfusesIdsWithNamesBug() + '</td></tr>' +
        '<tr><td>documentGetElementByIdIgnoresCaseBug:</td><td>' + BrowserSupport.documentGetElementByIdIgnoresCaseBug() + '</td></tr>' +
        '<tr><td>offsetValuesForStaticElementsInsidePositionedOnesBug:</td><td>' + BrowserSupport.offsetValuesForStaticElementsInsidePositionedOnesBug() + '</td></tr>' +
        '<tr><td>isDocumentGetElementsByNameBug:</td><td>' + BrowserSupport.isDocumentGetElementsByNameBug() + '</td></tr>' +
        '<tr><td>isOverflowStyleBug:</td><td>' + BrowserSupport.isOverflowStyleBug() + '</td></tr>' +
        '<tr><td>isQuerySelectorAllBug:</td><td>' + BrowserSupport.isQuerySelectorAllBug() + '</td></tr>' +
        '<tr><td>html5AudioCanPlayType:</td><td>' + BrowserSupport.html5Audio() + '</td></tr>' +
        '<tr><td>html5AudioInMP3Format:</td><td>' + BrowserSupport.html5AudioInMP3Format() + '</td></tr>' +
        '<tr><td>html5AudioInVorbisFormat:</td><td>' + BrowserSupport.html5AudioInVorbisFormat() + '</td></tr>' +
        '<tr><td>html5AudioInWavFormat:</td><td>' + BrowserSupport.html5AudioInWavFormat() + '</td></tr>' +
        '<tr><td>html5AudioInAACFormat:</td><td>' + BrowserSupport.html5AudioInAACFormat() + '</td></tr>' +
        '<tr><td>html5Canvas:</td><td>' + BrowserSupport.html5Canvas() + '</td></tr>' +
        '<tr><td>html5CanvasTextAPI:</td><td>' + BrowserSupport.html5CanvasTextAPI() + '</td></tr>' +
        '<tr><td>html5Command:</td><td>' + BrowserSupport.html5Command() + '</td></tr>' +
        '<tr><td>html5Datalist:</td><td>' + BrowserSupport.html5Datalist() + '</td></tr>' +
        '<tr><td>html5Details:</td><td>' + BrowserSupport.html5Details() + '</td></tr>' +
        '<tr><td>html5Device:</td><td>' + BrowserSupport.html5Device() + '</td></tr>' +
        '<tr><td>html5FormConstraintValidation:</td><td>' + BrowserSupport.html5FormConstraintValidation() + '</td></tr>' +
        '<tr><td>html5IframeSandbox:</td><td>' + BrowserSupport.html5IframeSandbox() + '</td></tr>' +
        '<tr><td>html5IframeSrcdoc:</td><td>' + BrowserSupport.html5IframeSrcdoc() + '</td></tr>' +
        '<tr><td>html5InputAutofocus:</td><td>' + BrowserSupport.html5InputAutofocus() + '</td></tr>' +
        '<tr><td>html5InputPlaceholder:</td><td>' + BrowserSupport.html5InputPlaceholder() + '</td></tr>' +
        '<tr><td>html5InputTypeColor:</td><td>' + BrowserSupport.html5InputTypeColor() + '</td></tr>' +
        '<tr><td>html5InputTypeEmail:</td><td>' + BrowserSupport.html5InputTypeEmail() + '</td></tr>' +
        '<tr><td>html5InputTypeNumber:</td><td>' + BrowserSupport.html5InputTypeNumber() + '</td></tr>' +
        '<tr><td>html5InputTypeRange:</td><td>' + BrowserSupport.html5InputTypeRange() + '</td></tr>' +
        '<tr><td>html5InputTypeSearch:</td><td>' + BrowserSupport.html5InputTypeSearch() + '</td></tr>' +
        '<tr><td>html5InputTypeTel:</td><td>' + BrowserSupport.html5InputTypeTel() + '</td></tr>' +
        '<tr><td>html5InputTypeUrl:</td><td>' + BrowserSupport.html5InputTypeUrl() + '</td></tr>' +
        '<tr><td>html5InputTypeDate:</td><td>' + BrowserSupport.html5InputTypeDate() + '</td></tr>' +
        '<tr><td>html5InputTypeTime:</td><td>' + BrowserSupport.html5InputTypeTime() + '</td></tr>' +
        '<tr><td>html5InputTypeDatetime:</td><td>' + BrowserSupport.html5InputTypeDatetime() + '</td></tr>' +
        '<tr><td>html5InputTypeDatetimeLocal:</td><td>' + BrowserSupport.html5InputTypeDatetimeLocal() + '</td></tr>' +
        '<tr><td>html5InputTypeMonth:</td><td>' + BrowserSupport.html5InputTypeMonth() + '</td></tr>' +
        '<tr><td>html5InputTypeWeek:</td><td>' + BrowserSupport.html5InputTypeWeek() + '</td></tr>' +
        '<tr><td>html5Meter:</td><td>' + BrowserSupport.html5Meter() + '</td></tr>' +
        '<tr><td>html5Output:</td><td>' + BrowserSupport.html5Output() + '</td></tr>' +
        '<tr><td>html5Progress:</td><td>' + BrowserSupport.html5Progress() + '</td></tr>' +
        '<tr><td>html5Time:</td><td>' + BrowserSupport.html5Time() + '</td></tr>' +
        '<tr><td>html5Video:</td><td>' + BrowserSupport.html5Video() + '</td></tr>' +
        '<tr><td>html5VideoCaptions:</td><td>' + BrowserSupport.html5VideoCaptions() + '</td></tr>' +
        '<tr><td>html5VideoPoster:</td><td>' + BrowserSupport.html5VideoPoster() + '</td></tr>' +
        '<tr><td>html5VidouInWebMFormat:</td><td>' + BrowserSupport.html5VidouInWebMFormat() + '</td></tr>' +
        '<tr><td>html5VidouInH264Format:</td><td>' + BrowserSupport.html5VidouInH264Format() + '</td></tr>' +
        '<tr><td>html5VidouInTheoraFormat:</td><td>' + BrowserSupport.html5VidouInTheoraFormat() + '</td></tr>' +
        '<tr><td>html5ContentEditable:</td><td>' + BrowserSupport.html5ContentEditable() + '</td></tr>' +
        '<tr><td>html5CrossDocumentMessaging:</td><td>' + BrowserSupport.html5CrossDocumentMessaging() + '</td></tr>' +
        '<tr><td>html5DragAndDrop:</td><td>' + BrowserSupport.html5DragAndDrop() + '</td></tr>' +
        '<tr><td>html5FileApi:</td><td>' + BrowserSupport.html5FileApi() + '</td></tr>' +
        '<tr><td>html5Geolocation:</td><td>' + BrowserSupport.html5Geolocation() + '</td></tr>' +
        '<tr><td>html5History:</td><td>' + BrowserSupport.html5History() + '</td></tr>' +
        '<tr><td>html5LocalStorage:</td><td>' + BrowserSupport.html5LocalStorage() + '</td></tr>' +
        '<tr><td>html5Microdata:</td><td>' + BrowserSupport.html5Microdata() + '</td></tr>' +
        '<tr><td>html5OfflineWebApplications:</td><td>' + BrowserSupport.html5OfflineWebApplications() + '</td></tr>' +
        '<tr><td>html5ServerSentEvents:</td><td>' + BrowserSupport.html5ServerSentEvents() + '</td></tr>' +
        '<tr><td>html5SessionStorage:</td><td>' + BrowserSupport.html5SessionStorage() + '</td></tr>' +
        '<tr><td>html5SVG:</td><td>' + BrowserSupport.html5SVG() + '</td></tr>' +
        '<tr><td>html5SVGInTextHtml:</td><td>' + BrowserSupport.html5SVGInTextHtml() + '</td></tr>' +
        '<tr><td>html5WebSimpleDB:</td><td>' + BrowserSupport.html5WebSimpleDB() + '</td></tr>' +
        '<tr><td>html5WebSocket:</td><td>' + BrowserSupport.html5WebSocket() + '</td></tr>' +
        '<tr><td>html5WebSQLDatabase:</td><td>' + BrowserSupport.html5WebSQLDatabase() + '</td></tr>' +
        '<tr><td>html5WebWorkers:</td><td>' + BrowserSupport.html5WebWorkers() + '</td></tr>' +
        '<tr><td>html5Widgets:</td><td>' + BrowserSupport.html5Widgets() + '</td></tr>' +
        '<tr><td>html5Undo:</td><td>' + BrowserSupport.html5Undo() + '</td></tr>' +
        '</table>';
        
      Env.document.body.appendChild(div);
    });
  }

	public static function main() {
	  Injector.forever(function(c) {
	    c.bind(ScheduledExecutor, ScheduledExecutorSystem);
	  });
	    
    iframeDemo();
	    
	  //browserSupportDemo();
	}
}