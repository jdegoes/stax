
import Prelude;
import Dom;
import js.Env;
import js.io.IFrameIO;
import js.dom.Elements;
import js.dom.Quirks;
import js.detect.BrowserSupport;
import haxe.framework.Injector;
import haxe.time.ScheduledExecutor;

using PreludeExtensions;

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

	  var iframe1: HTMLIFrameElement = Elements.iframe(300, 250);
	  var iframe2: HTMLIFrameElement = Elements.iframe(300, 250);

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
        '</table>';
        
      Env.document.body.appendChild(div);
    });
  }
  
	public static function main() {
	  Injector.enter(function(c) {
	    c.bind(ScheduledExecutor, ScheduledExecutorSystem);
	    
	    iframeDemo();
	    
	    browserSupportDemo();
	  });
	}
}