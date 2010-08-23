
package js.dom;

import Dom;
import js.Env;
import js.dom.Quirks;

import haxe.test.TestCase;
using js.dom.Quirks;
using PreludeExtensions;

class QuirksTestCase extends TestCase {
  var element: HTMLElement;

  override public function beforeAll(): Void {
    var d = Env.document;

    var body = d.getElementsByTagName('body')[0];
    element  = d.createElement('div');

    body.appendChild(element);
  }
  public function testSetGetOffset(): Void {
    var offset = {top: 40, left: 50};

    element.setOffset(offset);

    var elementOffset = element.getOffset().getOrElseC({top: 0, left: 0});

    assertEquals(offset.top, elementOffset.top);
    assertEquals(offset.left, elementOffset.left);
  }
  public function testSetGetHight(): Void {
    var hight = 121;

    element.setHeight(hight);

    assertEquals(hight, Quirks.getHeight(element).get());
  }
  public function testSetGetWidth(): Void {
    var width = 221;

    element.setWidth(width);

    assertEquals(width, Quirks.getWidth(element).get());
  }
}