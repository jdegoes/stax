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

package haxe;

import Dom;
import js.Env;
import js.dom.Quirks;
using  js.dom.Refinements;

import haxe.unit.TestCase;
import haxe.unit.TestRunner;

class DomTest extends TestCase {
    var _doc: Env.HTMLDocument;

    public function new():Void {
        super();
        _doc = Env.document;
    }
    
    public function handleEvent(e: Event): Void {
        trace("test working");
    }
    
    
    public function testSetup(): Void {        
        var clickText = _doc.getElementById("text");
        var self = this;
        clickText.addEventListener("click", {function(e) { self.handleEvent(e); }}, false);

        assertTrue(true);
    }
    
    public function testDocumentGetElementById(): Void {
        var main = _doc.getElementById("main");
        
        assertEquals("DIV", main.nodeName);
    }
    
    public function testDocumentAttributesGetNamedItemNodeValue(): Void {
        var main = _doc.getElementById("main");
        var nodeValue = main.attributes.getNamedItem("name").nodeValue;
        
        assertEquals("Primary Content", nodeValue);
    }
    
    public function testThatAttrHasProperties(): Void {
        var main = _doc.getElementById("main");
        
        var attr = _doc.createAttribute("main");
        main.setAttributeNode(attr);
        
        var properties = [
            "name",
            "specified",
            "value",
            "ownerElement",
            //"schemaTypeInfo", Not fully supported
            //"isId" Supported by FireFox
        ];
        
        verifyThatPropertiesExist(attr, properties);
    }
    
    public function testTextNodeCanBeSet(): Void {
        var main = _doc.getElementById("text");
        var text = main.firstChild.nodeValue;
        
        assertEquals("Click Me", text);
        
        text = "Something";
        
        assertEquals("Something", text);
    }
    
    public function testChangeElementStyle(): Void {
        var main = _doc.getElementById("main");
        
        assertEquals("", main.style.display);
        
        main.style.display = "none";
                
        assertEquals("none", main.style.display);
        
        main.style.display = "inherit";
    }
    
    public function testgetElementsByTagName(): Void {
        var divElements = _doc.getElementsByTagName("DIV");
        
        assertTrue(divElements.length > 13 && divElements.length < 16);
    }
    
    public function testDivNodeHasMethods(): Void {
        var div = _doc.getElementsByTagName("DIV")[0];
        
        var methods = [
            "hasChildNodes", 
            "replaceChild", 
            "removeChild", 
            "appendChild", 
            "cloneNode", 
            "normalize", 
            "isSupported", 
            "hasAttributes", 
            "addEventListener", 
            "removeEventListener", 
            "dispatchEvent",
            "compareDocumentPosition",
            "isSameNode",
            "lookupPrefix",
            "isDefaultNamespace",
            "lookupNamespaceURI",
            "isEqualNode",
        ];
        
        verifyThatMethodsExist(div, methods);
    }
    
    public function testDIVHasProperties(): Void {
        var div = _doc.getElementsByTagName("DIV")[0];
        
        var properties = [
            "nodeType",
            "parentNode",
            "childNodes",
            "firstChild",
            "lastChild",
            "previousSibling",
            "nextSibling",
            "attributes",
            "ownerDocument",
            "namespaceURI",
            "localName",
            "baseURI",
            "textContent",
        ];
        
        verifyThatPropertiesExist(div, properties);
    }
    
    public function testDOMImplementationHasMethods(): Void {
        var impl = _doc.implementation;
        
        var methods = [
            "hasFeature",
            "createDocumentType",
            "createDocument"
        ];
        
        verifyThatMethodsExist(impl, methods);
    }
    
    public function testNamedNodeMapHasMethods(): Void {
        var map = _doc.getElementsByTagName("DIV")[0].attributes;
        
        var methods = [
            "getNamedItem",
            "setNamedItem",
            "removeNamedItem",
            "item",
            "getNamedItemNS",
            "setNamedItemNS",
            "removeNamedItemNS"
        ];
        
        verifyThatMethodsExist(map, methods);
    }
    
    public function testTextNodeHasMethods(): Void {
        var textNode = _doc.createTextNode("new");
        textNode.nodeValue = "new text node";
        var methods = [
            "splitText",
            "replaceWholeText",
            "substringData",
            "appendData",
            "insertData",
            "deleteData",
            "replaceData",
            "hasChildNodes", 
            "replaceChild", 
            "removeChild", 
            "appendChild", 
            "cloneNode", 
            "normalize", 
            "isSupported", 
            "hasAttributes", 
            "addEventListener", 
            "removeEventListener", 
            "dispatchEvent",
            "compareDocumentPosition",
            "isSameNode",
            "lookupPrefix",
            "isDefaultNamespace",
            "lookupNamespaceURI",
            "isEqualNode",
        ];
        
        verifyThatMethodsExist(textNode, methods);
    }
    
    public function testThatTextNodeHasProperties(): Void {
        var textNode = _doc.createTextNode("new");
        
        var properties = [
            //"isElementContentWhitespace", Safari doesn't support this property
            "wholeText",
            "data",
            "length",
            "hasChildNodes", 
            "replaceChild", 
            "removeChild", 
            "appendChild", 
            "cloneNode", 
            "normalize", 
            "isSupported", 
            "hasAttributes", 
            "addEventListener", 
            "removeEventListener", 
            "dispatchEvent",
            "compareDocumentPosition",
            "isSameNode",
            "lookupPrefix",
            "isDefaultNamespace",
            "lookupNamespaceURI",
            "isEqualNode",
        ];
        
        verifyThatPropertiesExist(textNode, properties);
    }
    
    public function testThatElementHasProperties(): Void {
        var element1: HTMLElement = cast _doc.createElement("div");
        _doc.createAttribute("id");
        element1.setAttribute("id", "created-element");
        element1.setAttribute("value", "hasValue");
        element1.setAttribute("name", "hasName");
        
        var element2: HTMLElement = cast _doc.createElement("div");
        element2.setAttribute("id", "created-element-sibling");
        var main = _doc.getElementById("main");
        main.appendChild(element1);
        main.appendChild(element2);
        
        var element: HTMLElement = cast _doc.getElementById("created-element");

        var childspan: HTMLElement = cast _doc.createElement("span");
        childspan.setAttribute("class", "text");
        element.appendChild(childspan);
        
        var properties = [
            "tagName",
            //"schemaTypeInfo", Not supported by FireFox or Safari
            "scrollTop",
            "scrollLeft",
            "scrollWidth",
            "scrollHeight",
            "clientHeight",
            "clientWidth",
            "attributes",
            //"baseURIObject", Not fully supported
            "childElementCount",
            "childNodes",
            "className",
            "dir",
            "firstChild",
            "firstElementChild",
            "id",
            "innerHTML",
            //"isContentEditable", Not supported by FireFox
            "lang",
            "lastChild",
            "lastElementChild",
            "localName",
            "namespaceURI",
            "nextSibling",
            "nextElementSibling",
            "nodeName",
            //"nodePrinciple", Not fully supported
            "nodeType",
            "offsetHeight",
            "offsetLeft",
            //"offsetParent", Doesn't appear to exist on Element
            "offsetTop",
            "offsetWidth",
            "ownerDocument",
            "parentNode",
            //"prefix", Not fully supported
            "previousSibling",
            "previousElementSibling",
            //"spellcheck", Not supported by Safari
            "style",
            "tabIndex",
            "textContent",
            "title"
        ];
        
        verifyThatPropertiesExist(element, properties);
    }
    
    public function testThatElementHasMethods(): Void {
        var element1 = _doc.createElement("div");
        _doc.createAttribute("id");
        element1.setAttribute("id", "created-element");
        element1.setAttribute("value", "hasValue");
        element1.setAttribute("name", "hasName");
        
        var element2 = _doc.createElement("div");
        element2.setAttribute("id", "created-element-sibling");
        var main: HTMLElement = _doc.getElementById("main");
        main.appendChild(element1);
        main.appendChild(element2);
        
        var element = _doc.getElementById("created-element");
        
        var methods = [
            "addEventListener",
            "appendChild",
            //"blur",
            //"click",
            "cloneNode",
            "compareDocumentPosition",
            "dispatchEvent",
            "focus",
            "getAttribute",
            "getAttributeNS",
            "getAttributeNode",
            "getAttributeNodeNS",
            "getBoundingClientRect",
            "getClientRects",
            "getElementsByClassName",
            "getElementsByTagName",
            "getElementsByTagNameNS",
            //"getUserData", Not Supported by Safari
            "hasAttribute",
            "hasChildNodes",
            "insertBefore",
            "isDefaultNamespace",
            "isSupported",
            "lookupNamespaceURI",
            "lookupPrefix",
            //"mozMatchesSelector", Not Supported by Safari
            "normalize",
            "querySelector",
            "querySelectorAll",
            "removeAttribute",
            "removeAttributeNS",
            "removeAttributeNode",
            "removeChild",
            "removeEventListener",
            "replaceChild",
            "scrollIntoView",
            "setAttribute",
            "setAttributeNS",
            "setAttributeNode",
            "setAttributeNodeNS",
            //"setUserData" Not supported by Safari
        ];
        
        verifyThatMethodsExist(element, methods);
    }
    
    public function testThatDocumentTypeHasProperties(): Void {
        var docType = _doc.doctype;
        
        var properties = [
            "name",
            //"entities", Not fully supported
            //"notations", Not fully supported
            "publicId",
            "systemId",
            //"internalSubset" Not fully supported
        ];
        
        verifyThatPropertiesExist(docType, properties);
    }
    
    public function testThatDocumentHasProperties(): Void {
        var doc = _doc;
                
        var properties = [
        "activeElement",
        "anchors",
        "applets",
        "body",
        "characterSet",
        "childNodes",
        "compatMode",
        //"contentType", Not supported by Safari
        "cookie",
        "defaultView",
        "designMode",
        "dir",
        "doctype",
        "documentElement",
        "documentURI",
        "domain",
        "embeds",
        "firstChild",
        "forms",
        "height",
        "images",
        "implementation",
        "inputEncoding",
        "lastChild",
        "lastModified",
        "links",
        "location",
        "nodeName",
        "nodeType",
        "plugins",
        "readyState",
        "referrer",
        "styleSheets",
        "title",
        "URL",
        "width"
        ];
        
        verifyThatPropertiesExist(doc, properties);
    }
    
    public function testThatDocumentHasMethods(): Void {
        var doc = _doc;
        
        var methods = [
        "adoptNode",
        "appendChild",
        "cloneNode",
        "close",
        "compareDocumentPosition",
        "createAttributeNS",
        "createAttribute",
        "captureEvents",
        "addEventListener",
        "createCDATASection",
        "createComment",
        "createDocumentFragment",
        "createElement",
        "createElementNS",
        "createEntityReference",
        "createEvent",
        "createExpression",
        "createNSResolver",
        "createRange",
        "createTextNode",
        "createTreeWalker",
        "elementFromPoint",
        "evaluate",
        "execCommand",
        "getElementById",
        "getElementsByClassName",
        "getElementsByName",
        "getElementsByTagName",
        "getElementsByTagNameNS",
        //"getFeature", Not Supported by Safari
        "getSelection",
        //"getUserData", Not Supported by Safari
        "hasAttributes",
        "hasChildNodes",
        "hasFocus",
        "importNode",
        "insertBefore",
        "isDefaultNamespace",
        "isEqualNode",
        "isSameNode",
        "isSupported",
        "lookupNamespaceURI",
        "lookupPrefix",
        "normalize",
        //"normalizeDocument", Not Supported by Safari
        "open",
        "queryCommandEnabled",
        "queryCommandIndeterm",
        "queryCommandState",
        "queryCommandSupported",
        "queryCommandValue",
        "querySelector",
        "querySelectorAll",
        "releaseEvents",
        "removeChild",
        "removeEventListener",
        //"renameNode", Not Supported by Safari
        "replaceChild",
        //"routeEvent", Not Supported by Safari
        //"setUserData", Not Supported by Safari
        "write",
        "writeln"
        ];
        
        verifyThatMethodsExist(doc, methods);
    }
    
    public function testThatHTMLDocumentHasMethods(): Void {
        var doc: HTMLDocument = cast _doc;
        
        var methods = [
            "open",
            "close",
            "write",
            "writeln",
            "getElementsByName"
        ];
        
        verifyThatMethodsExist(doc, methods);
    }
    
    public function testThatHTMLDocumentHasProperties(): Void {
        var doc: HTMLDocument = cast _doc;
        
        var properties = [
            "title",
            "referrer",
            "domain",
            "URL",
            "body",
            "images",
            "applets",
            "links",
            "forms",
            "anchors",
            "cookie"
        ];
        
        verifyThatPropertiesExist(doc, properties);
    }
    
    public function testThatHTMLCollectionHasMethodsAndProperties(): Void {
        var doc: HTMLDocument =  cast _doc;
        var anchors = doc.anchors;
        
        var methods = [
            "item",
            "namedItem"    
        ];
        
        verifyThatMethodsExist(anchors, methods);
        
        var properties = [
            "length"
        ];
        
        verifyThatPropertiesExist(anchors, properties);
    }
    
    public function testThatHTMLInputElementHasMethodsAndProperties(): Void {
        var element =  _doc.getElementById("submit-input");
        var selectElement: HTMLInputElement = cast element;
        
        var methods = [
            "blur",
            "focus",
            "select",
            "click"
        ];
        
        verifyThatMethodsExist(selectElement, methods);
        
        var properties = [
            "defaultValue",
            "defaultChecked",
            "form",
            "accept",
            "accessKey",
            "align",
            "alt",
            "checked",
            "disabled",
            "maxLength",
            "name",
            "readOnly",
            "size",
            "src",
            "tabIndex",
            "type",
            "useMap",
            "value",
        ];
        
        verifyThatPropertiesExist(selectElement, properties);
    }
    
    public function testThatHTMLFormElementHasMethodsAndProperties(): Void {
        var element =  _doc.getElementById("form-element");
        var selectElement: HTMLFormElement = cast element;
        
        var methods = [
            "submit",
            "reset"
        ];
        
        verifyThatMethodsExist(selectElement, methods);
        
        var properties = [
            "elements",
            "length",
            "name",
            "acceptCharset",
            "action",
            "enctype",
            "method",
            "target",
        ];
        
        verifyThatPropertiesExist(selectElement, properties);
    }
    
    public function testThatHTMLElementHasMethodsAndProperties(): Void {
        var element =  _doc.getElementById("inset-div-1");
        var selectedElement: HTMLElement = cast element;
        
        var methods = [
            "addEventListener",
            "appendChild",
            "blur",
            "cloneNode",
            "compareDocumentPosition",
            "dispatchEvent",
            "focus",
            "getAttribute",
            "getAttributeNS",
            "getAttributeNode",
            "getAttributeNodeNS",
            "getBoundingClientRect",
            "getClientRects",
            "getElementsByClassName",
            "getElementsByTagName",
            "getElementsByTagNameNS",
            //"getUserData", Not Supported by Safari
            "hasAttribute",
            "hasAttributeNS",
            "hasAttributes",
            "hasChildNodes",
            "insertBefore",
            "isDefaultNamespace",
            "isEqualNode",
            "isSameNode",
            "isSupported",
            "lookupNamespaceURI",
            "lookupPrefix",
            //"mozMatchesSelector", Not Supported by Safari
            "normalize",
            "querySelector",
            "querySelectorAll",
            "removeAttribute",
            "removeAttributeNS",
            "removeAttributeNode",
            "removeChild",
            "removeEventListener",
            "replaceChild",
            "scrollIntoView",
            "setAttribute",
            "setAttributeNS",
            "setAttributeNode",
            "setAttributeNodeNS",
            //"setUserData" Not Supported by Safari
        ];
        
        verifyThatMethodsExist(selectedElement, methods);
        
        var properties = [
            "attributes",
            "baseURI",
            "childElementCount",
            "childNodes",
            "children",
            //"classList", Not Supported by Safari
            "className",
            "clientHeight",
            "clientLeft",
            "clientTop",
            "clientWidth",
            "contentEditable",
            "dir",
            "firstChild",
            "firstElementChild",
            "id",
            "innerHTML",
            "lang",
            "lastChild",
            "lastElementChild",
            "localName",
            "namespaceURI",
            "nextSibling",
            "nextElementSibling",
            "nodeName",
            "nodeType",
            "offsetHeight",
            "offsetLeft",
            "offsetParent",
            "offsetTop",
            "offsetWidth",
            "ownerDocument",
            "parentNode",
            "previousSibling",
            "previousElementSibling",
            "scrollHeight",
            "scrollLeft",
            "scrollTop",
            "scrollWidth",
            //"spellcheck", Not supported by Safari
            "style",
            "tabIndex",
            "tagName",
            "textContent",
            "title"
        ];
        
        verifyThatPropertiesExist(selectedElement, properties);
    }
    
    public function testThatHTMLHtmlElementHasProperties(): Void {
        var htmlElement =  _doc.getElementsByTagName("html")[0];
        
        var properties = [
            'version'
        ];
        
        verifyThatPropertiesExist(htmlElement, properties);
    }
    
    public function testThatHTMLHeadElementHasProperties(): Void {
        var headElement =  _doc.getElementsByTagName("head")[0];
        
        var properties = [
            'profile'
        ];
        
        verifyThatPropertiesExist(headElement, properties);
    }
    
    public function testThatHTMLLinkElementHasProperties(): Void {
        var element =  _doc.getElementById("link-element");
        var linkElement: HTMLLinkElement = cast element;
        
        var properties = [
            "charset",
            "disabled",
            "href",
            "hreflang",
            "media",
            "rel",
            "rev",
            "target",
            "type"
        ];
        
        verifyThatPropertiesExist(linkElement, properties);
    }
    
    public function testThatHTMLTitleElementHasProperties(): Void {
        var element =  _doc.getElementsByTagName("title")[0];
        var titleElement: HTMLTitleElement = cast element;
        
        var properties = [
            "text"
        ];
        
        verifyThatPropertiesExist(titleElement, properties);
    }
    
    public function testThatHTMLMetaElementHasProperties(): Void {
        var element =  _doc.getElementsByTagName("meta")[0];
        var metaElement: HTMLMetaElement = cast element;
        
        var properties = [
            "content",
            "httpEquiv",
            "lang",
            "id",
            "dir",
            "name",
            "scheme"
        ];
        
        verifyThatPropertiesExist(metaElement, properties);
    }
    
    public function testThatHTMLBaseElementHasProperties(): Void {
        var element =  _doc.getElementsByTagName("base")[0];
        var baseElement: HTMLBaseElement = cast element;
        
        var properties = [
            "id",
            "href",
            "target"
        ];
        
        verifyThatPropertiesExist(baseElement, properties);
    }
    
    public function testThatHTMLStyleElementHasProperties(): Void {
        var element =  _doc.getElementsByTagName("style")[0];
        var styleElement: HTMLStyleElement = cast element;
        
        var properties = [
            "media",
            "type",
            "disabled"
        ];
        
        verifyThatPropertiesExist(styleElement, properties);
    }
    
    public function testThatHTMLBodyElementHasProperties(): Void {
        var element =  _doc.getElementsByTagName("body")[0];
        var bodyElement: HTMLBodyElement = cast element;
        
        var properties = [
            "aLink",
            "background",
            "bgColor",
            "link",
            "text",
            "vLink"
        ];
        
        verifyThatPropertiesExist(bodyElement, properties);
    }
    
    public function testThatHTMLOptionElementHasProperties(): Void {
        var element =  _doc.getElementsByTagName("option")[1];
        var optionElement: HTMLOptionElement = cast element;
        
        var properties = [
            "form",
            "defaultSelected",
            "text",
            "index",
            "disabled",
            "label",
            "selected",
            "value"
        ];
        
        verifyThatPropertiesExist(optionElement, properties);
    }
    
    public function testThatHTMLTextAreaElementHasPropertiesAndMethods(): Void {
        var element =  _doc.getElementsByTagName("textarea")[0];
        var textAreaElement: HTMLTextAreaElement = cast element;
        
        var properties = [
            "defaultValue",
            "form",
            "accessKey",
            "cols",
            "disabled",
            "name",
            "readOnly",
            "rows",
            "tabIndex",
            "type",
            "value"
        ];
        
        verifyThatPropertiesExist(textAreaElement, properties);
        
        var methods = [
            "select",
            "blur",
            "focus"
        ];
        
        verifyThatMethodsExist(textAreaElement, methods);
    }
    
    public function testThatHTMLButtonElementHasProperties(): Void {
        var element =  _doc.getElementsByTagName("button")[0];
        var buttonElement: HTMLButtonElement = cast element;
        
        var properties = [
            "id",
            "lang",
            "name",
            "style",
            "tabIndex",
            "title",
            "type",
            "value"
        ];
        
        verifyThatPropertiesExist(buttonElement, properties);
    }
    
    public function testThatHTMLLabelElementHasProperties(): Void {
        var element =  _doc.getElementsByTagName("label")[0];
        var labelElement: HTMLLabelElement = cast element;
        
        var properties = [
            "form",
            "accessKey",
            "htmlFor"
        ];
        
        verifyThatPropertiesExist(labelElement, properties);
    }
    
    public function testThatHTMLFieldSetElementHasProperties(): Void {
        var fieldSet =  _doc.getElementsByTagName("legend")[0];
        
        var properties = [
            "form"
        ];
        
        verifyThatPropertiesExist(fieldSet, properties);
    }
    
    public function testThatHTMLLegendElementHasProperties(): Void {
        var fieldSet =  _doc.getElementsByTagName("legend")[0];
        
        var properties = [
            "form",
            "accessKey",
            "align"
        ];
        
        verifyThatPropertiesExist(fieldSet, properties);
    }
    
    public function testThatHTMLUListElementHasProperties(): Void {
        var uList =  _doc.getElementsByTagName("ul")[0];
        
        var properties = [
            "compact",
            "type"
        ];
        
        verifyThatPropertiesExist(uList, properties);
    }
    
    public function testThatHTMLOListElementHasProperties(): Void {
        var oList =  _doc.getElementsByTagName("ol")[0];
        
        var properties = [
            "compact",
            "start",
            "type"
        ];
        
        verifyThatPropertiesExist(oList, properties);
    }
    
    public function testThatHTMLDListElementHasProperties(): Void {
        var oList =  _doc.getElementsByTagName("ol")[0];
        var dList: HTMLDListElement = cast oList;
        
        var properties = [
            "compact",
        ];
        
        verifyThatPropertiesExist(dList, properties);
    }
    
    public function testThatHTMLDirectoryElementHasProperties(): Void {
        var dir =  _doc.getElementsByTagName("dir")[0];
        
        var properties = [
            "compact"
        ];
        
        verifyThatPropertiesExist(dir, properties);
    }
    
    public function testThatHTMLMenuElementHasProperties(): Void {
        var menu =  _doc.getElementsByTagName("menu")[0];
        
        var properties = [
            "compact"
        ];
        
        verifyThatPropertiesExist(menu, properties);
    }
    
    public function testThatHTMLLiElementHasProperties(): Void {
        var li =  _doc.getElementsByTagName("li")[0];
        
        var properties = [
            "type",
            "value"
        ];
        
        verifyThatPropertiesExist(li, properties);
    }
    
    public function testThatHTMLDivElementHasProperties(): Void {
        var div =  _doc.getElementsByTagName("div")[0];
        
        var properties = [
            "align"
        ];
        
        verifyThatPropertiesExist(div, properties);
    }
    
    public function testThatHTMLParagraphElementHasProperties(): Void {
        var paragraph =  _doc.getElementsByTagName("p")[0];
        
        var properties = [
            "align"
        ];
        
        verifyThatPropertiesExist(paragraph, properties);
    }
    
    public function testThatHTMLHeadingElementHasProperties(): Void {
        var heading =  _doc.getElementsByTagName("h1")[0];
        
        var properties = [
            "align"
        ];
        
        verifyThatPropertiesExist(heading, properties);
    }
    
    public function testThatHTMLQuoteElementHasProperties(): Void {
        var quote =  _doc.getElementsByTagName("q")[0];
        
        var properties = [
            "cite"
        ];
        
        verifyThatPropertiesExist(quote, properties);
    }
    
    public function testThatHTMLPreElementHasProperties(): Void {
        var pre =  _doc.getElementsByTagName("pre")[0];
        
        var properties = [
            "width"
        ];
        
        verifyThatPropertiesExist(pre, properties);
    }
    
    
    public function testThatHTMLBRElementHasProperties(): Void {
        var br =  _doc.getElementsByTagName("br")[0];
        
        var properties = [
            "clear"
        ];
        
        verifyThatPropertiesExist(br, properties);
    }
    
    public function testThatHTMLBaseFontElementHasProperties(): Void {
        var baseFont =  _doc.getElementsByTagName("baseFont")[0];
        
        var properties = [
            "color",
            "face",
            "size"
        ];
        
        verifyThatPropertiesExist(baseFont, properties);
    }
    
    public function testThatHTMLFontElementHasProperties(): Void {
        var font =  _doc.getElementsByTagName("font")[0];
        
        var properties = [
            "color",
            "face",
            "size"
        ];
        
        verifyThatPropertiesExist(font, properties);
    }
    
    public function testThatHTMLHrElementHasProperties(): Void {
        var hr =  _doc.getElementsByTagName("hr")[0];
        
        var properties = [
            "align",
            "noShade",
            "size",
            "width"
        ];
        
        verifyThatPropertiesExist(hr, properties);
    }
    
    public function testThatHTMLModElementHasProperties(): Void {
        var mod =  _doc.getElementsByTagName("ins")[0];
        
        var properties = [
            "cite",
            "dateTime"
        ];
        
        verifyThatPropertiesExist(mod, properties);
    }
    
    public function testThatHTMLAnchorElementHasPropertiesAndMethods(): Void {
        var anchor =  _doc.getElementsByTagName("a")[0];

        var properties = [
            "accessKey",
            "charset",
            "coords",
            "href",
            "hreflang",
            "name",
            "rel",
            "rev",
            "shape",
            "tabIndex",
            "target",
            "type"
        ];
        
        verifyThatPropertiesExist(anchor, properties);
        
        var methods = [
            "blur",
            "focus"
        ];
        
        verifyThatMethodsExist(anchor, methods);
    }
    
    public function xtestThatHTMLLinkElementHasProperties(): Void {
        var linkElement =  _doc.getElementById("link-element");
        trace(linkElement);
        var properties = [
            "charset",
            "disabled",
            "href",
            "hreflang",
            "media",
            "rel",
            "rev",
            "target",
            "type"
        ];
        
        verifyThatPropertiesExist(linkElement, properties);
    }
    
    public function testThatHTMLImgElementHasProperties(): Void {
        var img =  _doc.getElementsByTagName("img")[0];

        var properties = [
            "name",
            "align",
            "alt",
            "border",
            "height",
            "hspace",
            "isMap",
            "longDesc",
            "src",
            "useMap",
            "vspace",
            "width"
        ];
        
        verifyThatPropertiesExist(img, properties);
    }
    
    public function testThatHTMLObjectElementHasProperties(): Void {
        var object =  _doc.getElementsByTagName("object")[0];

        var properties = [
            "form",
            "code",
            "align",
            "archive",
            "border",
            "codeBase",
            "codeType",
            "data",
            "declare",
            "height",
            "hspace",
            "name",
            "standby",
            "tabIndex",
            "type",
            "useMap",
            "vspace",
            "width"
        ];
        
        verifyThatPropertiesExist(object, properties);
    }
    
    public function testThatHTMLParamElementHasProperties(): Void {
        var param =  _doc.getElementsByTagName("param")[0];

        var properties = [
            "name",
            "type",
            "value",
            "valueType"
        ];
        
        verifyThatPropertiesExist(param, properties);
    }
    
    public function testThatHTMLAppletElementHasProperties(): Void {
        var applet =  _doc.getElementsByTagName("applet")[0];

        var properties = [
            "align",
            "alt",
            "archive",
            "code",
            "codeBase",
            "height",
            "hspace",
            "name",
            "object",
            "vspace",
            "width"
        ];
        
        verifyThatPropertiesExist(applet, properties);
    }
    
    public function testThatHTMLMapElementHasProperties(): Void {
        var map =  _doc.getElementsByTagName("map")[0];

        var properties = [
            "areas",
            "name"
        ];
        
        verifyThatPropertiesExist(map, properties);
    }
    
    public function testThatHTMLAreaElementHasProperties(): Void {
        var area =  _doc.getElementsByTagName("area")[0];

        var properties = [
            "accessKey",
            "alt",
            "coords",
            "href",
            "noHref",
            "shape",
            "tabIndex",
            "target"
        ];
        
        verifyThatPropertiesExist(area, properties);
    }
    
    public function testThatHTMLScriptElementHasProperties(): Void {
        var script =  _doc.getElementsByTagName("script")[0];

        var properties = [
            "text",
            "htmlFor",
            "event",
            "charset",
            "defer",
            "src",
            "type"
        ];
        
        verifyThatPropertiesExist(script, properties);
    }
    
    public function testThatHTMLTableElementHasPropertiesAndMethods(): Void {
        var table =  _doc.getElementsByTagName("table")[0];

        var properties = [
            "caption",
            "tHead",
            "tFoot",
            "rows",
            "tBodies",
            "align",
            "bgColor",
            "border",
            "cellPadding",
            "cellSpacing",
            "frame",
            "rules",
            "summary",
            "width",
        ];
        
        verifyThatPropertiesExist(table, properties);
        
        var methods = [
            "createTHead",
            "deleteTHead",
            "createTFoot",
            "deleteTFoot",
            "createCaption",
            "deleteCaption",
            "insertRow",
            "deleteRow"
        ];
        
        verifyThatMethodsExist(table, methods);
    }
    
    public function testThatHTMLCaptionElementHasProperties(): Void {
        var caption =  _doc.getElementsByTagName("caption")[0];

        var properties = [
            "align"
        ];
        
        verifyThatPropertiesExist(caption, properties);
    }
    
    public function testThatHTMLTableColumnElementHasProperties(): Void {
        var tableColumn =  _doc.getElementsByTagName("col")[0];

        var properties = [
            "align",
            "ch",
            "chOff",
            "span",
            "vAlign",
            "width"
        ];
        
        verifyThatPropertiesExist(tableColumn, properties);
    }
    
    public function testThatHTMLTableSectionElementHasPropertiesAndMethods(): Void {
        var section =  _doc.getElementsByTagName("thead")[0];

        var properties = [
            "align",
            "ch",
            "chOff",
            "vAlign",
            "rows"
        ];
        
        var methods = [
            "insertRow",
            "deleteRow"
        ];
        
        verifyThatMethodsExist(section, methods);
        
        verifyThatPropertiesExist(section, properties);
    }
    
    public function testThatHTMLTableRowElementHasProperties(): Void {
        var tableRow =  _doc.getElementsByTagName("tr")[0];

        var properties = [
            "rowIndex",
            "sectionRowIndex",
            "cells",
            "align",
            "bgColor",
            "ch",
            "chOff",
            "vAlign"
        ];
        
        var methods = [
            "insertCell",
            "deleteCell"
        ];
        
        verifyThatMethodsExist(tableRow, methods);
        
        verifyThatPropertiesExist(tableRow, properties);
    }
    
    public function testThatHTMLTableCellElementHasProperties(): Void {
        var tableDivision =  _doc.getElementsByTagName("td")[0];

        var properties = [
            "cellIndex",
            "abbr",
            "align",
            "axis",
            "bgColor",
            "ch",
            "chOff",
            "colSpan",
            "headers",
            "height",
            "noWrap",
            "rowSpan",
            "scope",
            "vAlign",
            "width"
        ];
        
        verifyThatPropertiesExist(tableDivision, properties);
    }
    
    public function testThatHTMLIFrameElementHasProperties(): Void {
        var iframe =  _doc.getElementsByTagName("iframe")[0];

        var properties = [
            "align",
            "frameBorder",
            "height",
            "longDesc",
            "marginHeight",
            "name",
            "scrolling",
            "src",
            "width",
            "contentDocument",
            "contentWindow"
        ];
        
        verifyThatPropertiesExist(iframe, properties);
    }
    
    public function testThatWindowHasPropertiesAndMethods(): Void {
        var view = _doc.defaultView;

        var properties = [
            "closed",
            "defaultStatus",
            "frames",
            "innerHeight",
            "innerWidth",
            "length",
            "navigator",
            //"opener",
            "outerHeight",
            "outerWidth",
            "pageXOffset",
            "pageYOffset",
            "parent",
            "screen",
            //"screenLeft",
            //"screenTop",
            "screenX",
            "screenY",
            "status",
            "scrollY",
            "top",
            "window",
            "self",
            "document",
            "name",
            "location",
            "history",
            //"undoManager",
            "locationbar",
            "menubar",
            "personalbar",
            "scrollbars",
            "statusbar",
            "toolbar",
            //"frameElement",
            "applicationCache",
            "localStorage",
            //"dialogArguments",
            //"returnValue",
            //"sessionStorage",
            //"crypto", Mozilla Specific
            //"media",
        ];        
        
        verifyThatPropertiesExist(view, properties);
        
        var methods = [
            "moveBy",
            "moveTo",
            "find",
            "resizeTo",
            "resizeBy",
            "atob",
            "btoa",
            "getComputedStyle",
            "postMessage",
            "getSelection",
            "stop",
            "close",
            "focus",
            "blur",
            "open",
            "alert",
            "confirm",
            "prompt",
            "print",
            "showModalDialog",
            "scroll",
            "scrollTo",
            "scrollBy",
            "setTimeout",
            "clearTimeout",
            "setInterval",
            "clearInterval"
        ];
        
        verifyThatMethodsExist(view, methods);
    }
    
    public function testThatWindowBarPropContainsProperties(): Void {
        var bar =  _doc.defaultView.locationbar;
        var properties = [
            "visible"
        ];
        
        verifyThatPropertiesExist(bar, properties);
    }
    
    public function testThatMouseEventWorks(): Void {
        var main = _doc.getElementById("main");
        
        var win = _doc.defaultView;
        
        main.addEventListener(
            "mousedown", { 
                function(e: MouseEvent):Void {
                    trace(e.screenX);
                } 
            }, false
        );
        
        win.addEventListener(
            "mousedown", { 
                function(e: MouseEvent):Void {
                    trace(e.screenX);
                } 
            }, false
        );
        
        assertTrue(true);
    }
    
    public function testThatCSSStyleSheetHasMethodsAndProperties(): Void {
        var styleSheet = _doc.styleSheets[0];
        
        var properties = [
            "ownerNode",
            "cssRules",
            //"href",               No external CSS style sheet in this test
            "type",
            //"parentStyleSheet",   No parent style sheet in this test
            //"title",              No title in this case
            "disabled",
            "media"
        ];
        
        verifyThatPropertiesExist(styleSheet, properties);
        
        var methods = [
            "insertRule",
            "deleteRule"
        ];
        
        verifyThatMethodsExist(styleSheet, methods);
    }
    
    public function testThatCSSRuleHasProperties(): Void {
        var stylesheet: CSSStyleSheet = cast _doc.styleSheets[0];
        var rule = stylesheet.cssRules[0];
        
        var properties = [
            "type",
            "cssText",
            //"parentRule",  No parentRule in this case
            "parentStyleSheet"
        ];
        
        verifyThatPropertiesExist(rule, properties);
    }
    
    public function testThatCSSStyleDeclarationHasPropertiesAndMethods(): Void {
        var div: HTMLElement = cast _doc.getElementsByTagName('DIV')[0];
        
        
        //trace(navigator);
        //assertTrue(untyped __js__('navigator instanceof Navigator'));
        
        var cssStyleDeclaration: CSSInlineStyleDeclaration = div.style;
        
        var properties = [
            "length",
            "cssText",
            //"parentRule" No Parent in this instance
        ];
        
        verifyThatPropertiesExist(cssStyleDeclaration, properties);
        
        var methods= [
            "removeProperty",
            "getPropertyPriority",
            "getPropertyValue",
            //"getPropertyShorthand",
            "getPropertyCSSValue",
            //"isPropertyImplicit",
            "item",
            "setProperty"
        ];
        
        verifyThatMethodsExist(cssStyleDeclaration, methods);
    }

/*  Firefox Returns Null when trying to retrieve this object -- Safari tested
    public function testThatCSSPrimitiveValueHasPropertiesAndMethods(): Void {
        var div: HTMLElement = cast _doc.getElementById('inlineStyleElement');
        
        var cssStyleDeclaration: CSSInlineStyleDeclaration = div.style;
        
        var cssValue = cssStyleDeclaration.getPropertyCSSValue('color');
        
        var properties = [
            //"cssValueType", Not Supported by Firefox
            "cssText",
            "primitiveType"
        ];
        
        verifyThatPropertiesExist(cssValue, properties);
        
        var methods = [
            "getRectValue",
            "getCounterValue",
            "getRGBColorValue",
            "getStringValue",
            "setStringValue",
            "getFloatValue",
            "setFloatValue"
        ];
        
        verifyThatPropertiesExist(cssValue, methods);
    }
*/

    public function testThatNavigatorHasPropertiesAndMethods(): Void {
        var navigator = Env.navigator;
        
        var properties = [
            "appCodeName",
            "cookieEnabled",
            "geolocation",
            "language",
            "appName",
            "appVersion",
            "platform",
            "userAgent",
            "appName",
            "appVersion",
            "platform",
            "plugins",
            "onLine",
            "productSub",
            "product",
            "mimeTypes",
            "vendorSub",
            "vendor",
            "cookieEnabled"
        ];
        
        verifyThatPropertiesExist(navigator, properties);
    }
    
    public function testThatPluginHasPropertiesAndMethods(): Void {
        var plugins = Env.navigator.plugins[0];
        
        var properties = [
            "length",
            "name",
            "filename",
            "description"
        ];
        
        verifyThatPropertiesExist(plugins, properties);
        
        var methods = [
            "item",
            "namedItem"
        ];
        
        verifyThatMethodsExist(plugins, methods);
    }
    
    public function testThatHistoryHasPropertiesAndMethods(): Void {
        var history = Env.history;
        
        var properties = [
            "length"
        ];
        
        verifyThatPropertiesExist(history, properties);
        
        var methods = [
            "back",
            "forward",
            "go",
            //"pushState",      Not supported by Firefox
            //"replaceState"    Not supported by Firefox
        ];
        
        verifyThatMethodsExist(history, methods);
    }
    
    public function testThatLocationHasPropertiesAndMethods(): Void {
        var loc:Location = Env.location;

        var properties = [
            "hash",
            "host",
            "hostname",
            "href",
            "pathname",
            "port",
            "protocol",
            "search"
        ];
        
        verifyThatPropertiesExist(loc, properties);
        
        var methods = [
            "assign",
            "replace",
            "reload",
            //"resolveURL"  Not available for testing in this case
        ];
        
        verifyThatMethodsExist(loc, methods);
    }
    
    public function testThatScreenHasPropertiesAndMethods(): Void {
        var screen = Env.screen;

        var properties = [
            "availHeight",	
            "availWidth",	
            "colorDepth",	
            "height",	
            "pixelDepth",	
            "width",
            "availTop",
            "availLeft",
            //"left",
            //"top"
        ];
        
        verifyThatPropertiesExist(screen, properties);
        
        var methods = [
            //"assign",
            //"replace",
            //"reload",
            //"resolveURL"  Not available for testing in Firefox
        ];
        
        verifyThatMethodsExist(screen, methods);
    }
    
    public function testThatBarPropHasProperties(): Void {
        var barProp = Env.window.locationbar;
        
        var properties = [
            "visible"
        ];
        
        verifyThatPropertiesExist(barProp, properties);
    }
    
    public function testThatApplicationCacheHasPropertiesAndMethods(): Void {
        var appCache = Env.window.applicationCache;
        
        var properties = [
            "status",
            //"length",
        ];
        
        verifyThatPropertiesExist(appCache, properties);
        
        var methods = [
            "swapCache",
            //"item",
            //"add",
            //"remove",
            "update",
            "dispatchEvent",
            "addEventListener",
            "removeEventListener",
            //"onchecking",
            //"onerror",
            //"onnoupdate",
            //"ondownloading",
            //"onprogress",
            //"onupdateready",
            //"oncached",
            //"onobsolete"
        ];
        
        verifyThatMethodsExist(appCache, methods);
    }

/*  No major browser supports the UndoManager as of 7/1/2010
    public function testThatUndoManagerHasPropertiesAndMethods(): Void {
        var undoManager = Env.window.applicationCache;

        //alertObject(undoManager);
        trace(undoManager);
        
        var properties = [
            "status"
            //"length",
            //"position"
        ];
        
        verifyThatPropertiesExist(undoManager, properties);
        
        var methods = [
            //"add",
            //"remove",
            //"clearUndo",
            //"clearRedo",
            //"item"
        ];
        
        verifyThatMethodsExist(undoManager, methods);
    }
*/  

    public function testThatXMLHTTPRequestHasPropertiesAndMethods(): Void {
        var xhr = Quirks.createXMLHttpRequest();
        
        assertTrue(untyped __js__('xhr instanceof XMLHttpRequest'));

        var properties = [
            "readyState",
            "status",
            "statusText",
            "responseText"
        ];
        
        verifyThatPropertiesExist(xhr, properties);
        
        var methods = [
            "open",
            "setRequestHeader",
            "send",
            "abort",
            "getResponseHeader",
            "getAllResponseHeaders",
            //"onload",
            //"onerror",
            //"onloadstart",
            //"status",
            //"onabort",
            //"onreadystatechange",
            //"onprogress",
            //"withCredientials",
            //"dispatchEvent"
        ];
        
        verifyThatMethodsExist(xhr, methods);
    }
    
    public function testThatEncodeURIWorks(): Void {
        var encodedURI = Env.encodeURI('~!@#$%^&*(){}[]=:/,;?+\'"\\');

        assertEquals("~!@#$%25%5E&*()%7B%7D%5B%5D=:/,;?+'%22%5C", encodedURI);
    }
    
    public function testThatDecodeURIWorks(): Void {
        var decodedURI = Env.decodeURI("~!@#$%25%5E&*()%7B%7D%5B%5D=:/,;?+'%22%5C");

        assertEquals('~!@#$%^&*(){}[]=:/,;?+\'"\\', decodedURI);
    }
    
    public function testThatEncodeURIComponentWorks(): Void {
        var encodedURI = Env.encodeURIComponent('Thyme &time=again');

        assertEquals("Thyme%20%26time%3Dagain", encodedURI);
    }
    
    public function testThatDecodeURIComponentWorks(): Void {
        var encodedURI = Env.decodeURIComponent('Thyme%20%26time%3Dagain');

        assertEquals("Thyme &time=again", encodedURI);
    }
    
    public function testThatEscapeWorks(): Void {
        var escapedString = Env.escape('http://www.google.com?q=quadrilateral');

        assertEquals("http%3A//www.google.com%3Fq%3Dquadrilateral", escapedString);
    }
    
    public function testThatUnescapeWorks(): Void {
        var unescapedString = Env.unescape('http%3A//www.google.com%3Fq%3Dquadrilateral');

        assertEquals("http://www.google.com?q=quadrilateral", unescapedString);
    }
    
    public function testThatIsFiniteWorks(): Void {
        var n = 22;
        
        assertTrue(Env.isFinite(22.2));
        assertFalse(Env.isFinite(Env.JInfinity));
    }
    
    public function testThatIsNaNWorks(): Void {
        var n = 22;
        
        assertFalse(Env.isNaN(22.2));
        assertTrue(Env.isNaN(Env.JNaN));
    }
    
    public function testThatJUndefinedWorks(): Void {
        assertEquals(Std.string(Type.typeof(Env.JUndefined)), 'TNull');
    }
    
    public function testThatCreateXMLHttpRequestWorks(): Void {
        var req = Quirks.createXMLHttpRequest();
        
        assertTrue(untyped __js__('req instanceof XMLHttpRequest'));
        
        assertTrue(Type.typeof(req) != null);
    }
    
    public function testThatCanvasElementContainsMethodsAndProperties(): Void {
        var canvas: HTMLCanvasElement = cast _doc.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var radGrad: CanvasGradient = ctx.createRadialGradient(10, 10, 1000, 10, 10, 10);
        var mesText = ctx.measureText('yippee calle');
        var imgData = ctx.getImageData(20,20,20,20);
        var pixArray = imgData.data;

        ctx.fillStyle = "rgb(200, 0, 0)";
        ctx.fillRect(10, 10, 55, 50);
        
        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect(30, 30, 55, 50);
        
        assertTrue(untyped __js__('mesText instanceof TextMetrics'));
        assertTrue(untyped __js__('ctx instanceof CanvasRenderingContext2D'));
        //assertTrue(untyped __js__('imgData instanceof ImageData'));
        //assertTrue(untyped __js__('pixArray instanceof CanvasPixelArray'));
        //assertTrue(untyped __js__('radGrad instanceof CanvasGradient'));
        
        
        var pixArrayProperties = [
            "length"
        ];
        
        var imgDataProperties = [
            "width",
            "height",
            "data"
        ];
        
        var mesTextProperties = [
            "width"
        ];
        
        var radGradMethods = [
            "addColorStop"
        ];
        
        var canvasProperties = [
            "height",
            "width"
        ];
        
        var ctxProperties = [
            "canvas",
            "globalAlpha",
            "strokeStyle",
            "fillStyle",
            "lineWidth",
            "lineCap",
            "lineJoin",
            "miterLimit",
            "shadowOffsetX",
            "shadowOffsetY",
            "shadowBlur",
            "shadowColor",
            "font",
            "textAlign",
            "textBaseline"
        ];
        
        var ctxMethods = [
            "save", 
            "restore", 
            "scale",
            "rotate",
            "translate",
            "transform",
            "setTransform",
            "createLinearGradient",
            "createRadialGradient",
            "createPattern",
            "clearRect",
            "fillRect",
            "strokeRect",
            "beginPath",
            "closePath",
            "moveTo",
            "lineTo",
            "quadraticCurveTo",
            "bezierCurveTo",
            "arcTo",
            "rect",
            "arc",
            "fill",
            "stroke",
            "clip",
            "isPointInPath",
            //"drawFocusRing",
            "fillText",
            "strokeText",
            "measureText",
            "drawImage",
            "createImageData",
            "getImageData",
            "putImageData"
        ];
        verifyThatPropertiesExist(canvas, canvasProperties);
        verifyThatPropertiesExist(ctx, ctxProperties);
        verifyThatMethodsExist(ctx, ctxMethods);
        verifyThatMethodsExist(radGrad, radGradMethods);
        verifyThatPropertiesExist(mesText, mesTextProperties);
        verifyThatPropertiesExist(imgData, imgDataProperties);
        verifyThatPropertiesExist(pixArray, pixArrayProperties);
    }

    
    



















    private function alertObject(obj) {
        untyped __js__('
        (function(){for (key in obj) {
            alert(key);
        }})')();
    }
    
    private function verifyThatMethodsExist(o: Dynamic, methods: Array<String>, ?pos: haxe.PosInfos): Void {
        for (method in methods) {
            var m = untyped o[method];
            
            var t = Type.typeof(m);
            
            var isMethod = switch (t) {
                case TFunction: true;
                default: false;
            }
            
            if (!isMethod) { trace("Object does not contain method : " + method  + ". From line: "+ pos.lineNumber); assertTrue(false); }
            else assertTrue(true);
        }
    }
    
    private function verifyThatPropertiesExist(o: Dynamic, fields: Array<String>, ?pos: haxe.PosInfos): Void {
        for (field in fields) {
            var f = Reflect.field(o, field);
            if (f == null) { trace("Object does not contain property : " + field + ". From line: "+ pos.lineNumber); assertTrue(false); }
            else assertTrue(true);
        }
    }
    
    

}

class DomTester {
	public static function main():Void {
		var tr = new haxe.unit.TestRunner();
	    
	    var tester1 = new DomTest();
	    
	    tr.add(tester1);
	    
	    tr.run();
	    
	}
}