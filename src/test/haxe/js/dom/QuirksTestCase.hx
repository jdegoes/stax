
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
    element.setCssProperty("padding-left", "2px");
    element.setCssProperty("padding-right", "3px");
    element.setCssProperty("margin-left", "5px");
    element.setCssProperty("margin-right", "6px");

    assertEquals(width + 5, Quirks.getWidth(element).get());
  }
  public function testGetInnerWidth(): Void {
    var width = 221;

    element.setWidth(width);
    element.setCssProperty("padding-left", "2px");
    element.setCssProperty("padding-right", "3px");
    element.setCssProperty("margin-left", "5px");
    element.setCssProperty("margin-right", "6px");

    assertEquals(width, Quirks.getInnerWidth(element).get());
  }

  public function testGetOuterWidth(): Void {
    var width = 221;

    element.setWidth(width);
    element.setCssProperty("padding-left", "2px");
    element.setCssProperty("padding-right", "3px");
    element.setCssProperty("margin-left", "5px");
    element.setCssProperty("margin-right", "6px");

    assertEquals(width + 5, Quirks.getOuterWidth(element, false).get());
  }

  public function testGetOuterWidthWithMargin(): Void {
    var width = 221;

    element.setWidth(width);
    element.setCssProperty("padding-left", "2px");
    element.setCssProperty("padding-right", "3px");
    element.setCssProperty("margin-left", "5px");
    element.setCssProperty("margin-right", "6px");

    assertEquals(width + 11, Quirks.getOuterWidth(element, true).get());
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
  public function testRemoveClassRemoveCorrectClass(): Void {
    var className  = "test-class";
    var className1 = "foo";

    element.addClass(className);
    element.addClass(className1);
    element.removeClass(className);

    assertEquals(true, element.hasClass(className1));
  }
  public function testHasClass(): Void {
    var className = "test-class";

    element.addClass(className);

    assertEquals(true, element.hasClass(className));
  }
  public function testHasNoClass(): Void {
    assertEquals(false, element.hasClass("wrong-class-name"));
  }

  public function testSetOpacityProperty(): Void {
    var value = "0.5";

    element.setCssProperty("opacity",value);

    assertEquals(value, element.getComputedCssProperty("opacity").get());
  }

  public function testPosition(): Void {
    var offset = {x: 50, y: 40};

    var d = Env.document;
    var body = d.getElementsByTagName('body')[0];
    var element2  = d.createElement('div');

    body.appendChild(element2);
    element2.setOffset(offset);

    var position = element2.getPosition().get();
    assertEquals(offset.x, position.x);
    assertEquals(offset.y, position.y);
  }

  public function testNestedPosition(): Void {
    var offset = {x: 10, y: 20};

    var d = Env.document;
    var body = d.getElementsByTagName('body')[0];
    var element2  = d.createElement('div');

    body.appendChild(element2);
    element2.setOffset(offset);

    var d           = Env.document;
    var subElement  = d.createElement('div');
    element2.appendChild(subElement);

    var subOffset = {x: 20, y: 40};
    subElement.setOffset(subOffset);

    var position = subElement.getPosition().get();

    assertEquals(10, position.x);
    assertEquals(20, position.y);
  }
}