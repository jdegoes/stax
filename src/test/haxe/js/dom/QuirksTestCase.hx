
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
    var offset = {x: 50, y: 40};

    element.setOffset(offset);

    var elementOffset = element.getOffset().getOrElseC({x: 0, y: 0});

    assertEquals(offset.x, elementOffset.x);
    assertEquals(offset.y, elementOffset.y);
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

  public function testAddClass(): Void {
    var className = "test-class";

    element.addClass(className);

    assertEquals(className, element.className);
  }
  public function testRemoveClass(): Void {
    var className = "test-class";

    element.addClass(className);
    element.removeClass(className);

    assertEquals(false, element.hasClass(className));
  }
  public function testHasClass(): Void {
    var className = "test-class";

    element.addClass(className);

    assertEquals(true, element.hasClass(className));
  }
  public function testHasNoClass(): Void {
    assertEquals(false, element.hasClass("wrong-class-name"));
  }  
}