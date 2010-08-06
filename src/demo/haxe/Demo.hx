
import Prelude;
import Dom;
import js.Env;
import js.io.IFrameIO;
import js.dom.Elements;
import js.dom.Quirks;
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

	  var d = Env.documentHtml;

	  var body = d.getElementsByTagName('body')[0];

	  var iframe1: HTMLIFrameElement = Elements.newIframe(300, 250);
	  var iframe2: HTMLIFrameElement = Elements.newIframe(300, 250);

	  iframe1.setAttribute('src', 'about:blank');
	  iframe2.setAttribute('src', 'about:blank');

	  body.appendChild(iframe1);
	  body.appendChild(iframe2);

	  var doc1: HTMLDocument = cast Quirks.getIframeDocument(iframe1);
	  var doc2: HTMLDocument = cast Quirks.getIframeDocument(iframe2);
	  
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
	  }, 'about:self', window2);
	  
	  iframeIO2.receive(function(data) {
	    div2.innerHTML += data;
	  }, 'about:self', window1);
	  
	  button1.onclick = function(e) {
	    iframeIO1.send(textarea1.value, 'about:self', window2);
	    
	    textarea1.value = '';
	  };
	  
	  button2.onclick = function(e) {
	    iframeIO2.send(textarea2.value, 'about:self', window1);
	    
	    textarea2.value = '';
	  };
  }
  
	public static function main() {
	  Injector.enter(function(c) {
	    c.bind(ScheduledExecutor, ScheduledExecutorSystem);
	    
	    iframeDemo();
	  });
	}
}