
import Prelude;
import Dom;
import js.Env;
import js.io.IFrameIO;
import js.dom.Elements;

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

	  var doc1: HTMLDocument = cast Quirks.contentDocumentOf(iframe1);
	  var doc2: HTMLDocument = cast Quirks.contentDocumentOf(iframe2);
	  
	  doc1.open();
	  doc1.write(IframeTemplate);
	  doc1.close();
	  
	  doc2.open();
	  doc2.write(IframeTemplate);
	  doc2.close();

	  window1 = doc1.defaultView;
	  window2 = doc2.defaultView;

	  iframeIO1 = new IFrameIOAutoDetect(window1);
	  iframeIO2 = new IFrameIOAutoDetect(window2);
	  
	  var div1 = doc1.getElementById('div');
	  var div2 = doc2.getElementById('div');
	  
	  var textarea1 = doc1.getElementById('textarea');
	  var textarea2 = doc2.getElementById('textarea');
	  
	  var button1 = doc1.getElementById('button');
	  var button2 = doc2.getElementById('button');
	  
	  window1.receive(function(data) {
	    div1.innerHTML += data;
	  }, 'about:self', window2);
	  
	  window2.receive(function(data) {
	    div2.innerHTML += data;
	  }, 'about:self', window1);
	  
	  button1.onclick = function(e) {
	    iframeIO1.send(textarea1.innerHTML, 'about:self', window2);
	  };
	  
	  button2.onclick = function(e) {
	    iframeIO12.send(textarea2.innerHTML, 'about:self', window1);
	  };
  }
  
	public static function main() {
	  iframeDemo();
	}
}