package js;

import Dom;

class Env {
    /** Top level objects */
    public static var document:       Document          = untyped __js__('document');
    public static var documentHtml:   HTMLDocument      = untyped __js__('document');
    public static var screen:         Screen            = untyped __js__('screen');
    public static var window:         Window            = untyped __js__('window');
    public static var navigator:      Navigator         = untyped __js__('navigator');
    public static var history:        History           = untyped __js__('history');
    public static var location:       Location          = untyped __js__('location');
    
    /** Top level values */
    public static var JInfinity : Dynamic  = untyped __js__('Infinity');
    public static var JNaN      : Dynamic  = untyped __js__('NaN');
    public static var JUndefined: Dynamic  = untyped __js__('undefined');
    
    /** Top level functions */
    public static function alert(a: Dynamic): Void {
        untyped __js__('alert')(Std.string(a));
    }
        
    public static function decodeURI(uri: DOMString): DOMString {
        return untyped __js__('decodeURI(uri)');
    }
    
    public static function decodeURIComponent(uriComponent: DOMString): DOMString {
        return untyped __js__('decodeURIComponent(uriComponent)');
    }
    
    public static function encodeURI(uri: DOMString): DOMString {
        return untyped __js__('encodeURI(uri)');
    }
    
    public static function encodeURIComponent(uriComponent: DOMString): DOMString {
        return untyped __js__("encodeURIComponent(uriComponent)");
    }
    
    public static function escape(string: DOMString): DOMString {
        return untyped __js__('escape(string)');
    }
    
    public static function unescape(string: DOMString): DOMString {
        return untyped __js__('unescape(string)');
    }
    
    public static function eval(?string: DOMString): DOMString {
        return untyped __js__('eval(string)');
    }
    
    public static function isFinite(number: Float): Bool {
        return untyped __js__('isFinite(number)');
    }
    
    public static function isNaN(number: Float): Bool {
        return untyped __js__('isNaN(number)');
    }
    
    public static function createXMLHttpRequest(): XMLHttpRequest {
        return untyped if (window.XMLHttpRequest) {
            __new__("XMLHttpRequest");
        }
        else if (window.ActiveXObject) {
            try {
                __new__("ActiveXObject","Msxml2.XMLHTTP");
            }
            catch (e: Dynamic){
                try {
                    __new__("ActiveXObject","Microsoft.XMLHTTP");
                }
                catch (e: Dynamic){
                    throw "Unable to create XMLHttpRequest object.";

                    null;
                }
            }
        }
        else {
            throw "Unable to create XMLHttpRequest object.";

            null;
        }
    }
    
    public static function contentDocumentOf(iframe: HTMLIFrameElement): Document {
      return if (iframe.contentDocument != null) {
        iframe.contentDocument;
      }
      else if (iframe.contentWindow != null) {
        iframe.contentWindow.document;
      }
      else if (untyped iframe.document != null) {
        untyped iframe.document;
      }
      else { throw "Cannot find iframe content document for " + iframe; null; }
      
    }
}

class States {
    public static var UNSENT                         :Int = 0;
    public static var OPENED                         :Int = 1;
    public static var HEADERS_RECEIVED               :Int = 2;
    public static var LOADING                        :Int = 3;
    public static var DONE                           :Int = 4;
}

class ExceptionCode {
    private function new() { }
    
    public static var INDEX_SIZE_ERR                 :Int = 1;
    public static var DOMSTRING_SIZE_ERR             :Int = 2;
    public static var HIERARCHY_REQUEST_ERR          :Int = 3;
    public static var WRONG_DOCUMENT_ERR             :Int = 4;
    public static var INVALID_CHARACTER_ERR          :Int = 5;
    public static var NO_DATA_ALLOWED_ERR            :Int = 6;
    public static var NO_MODIFICATION_ALLOWED_ERR    :Int = 7;
    public static var NOT_FOUND_ERR                  :Int = 8;
    public static var NOT_SUPPORTED_ERR              :Int = 9;
    public static var INUSE_ATTRIBUTE_ERR            :Int = 10;
    public static var INVALID_STATE_ERR              :Int = 11;
    public static var SYNTAX_ERR                     :Int = 12;
    public static var INVALID_MODIFICATION_ERR       :Int = 13;
    public static var NAMESPACE_ERR                  :Int = 14;
    public static var INVALID_ACCESS_ERR             :Int = 15;
    public static var VALIDATION_ERR                 :Int = 16;
    public static var TYPE_MISMATCH_ERR              :Int = 17;
}

class NodeType {
    public static var ELEMENT_NODE                   :Int = 1;
    public static var ATTRIBUTE_NODE                 :Int = 2;
    public static var TEXT_NODE                      :Int = 3;
    public static var CDATA_SECTION_NODE             :Int = 4;
    public static var ENTITY_REFERENCE_NODE          :Int = 5;
    public static var ENTITY_NODE                    :Int = 6;
    public static var PROCESSING_INSTRUCTION_NODE    :Int = 7;
    public static var COMMENT_NODE                   :Int = 8;
    public static var DOCUMENT_NODE                  :Int = 9;
    public static var DOCUMENT_TYPE_NODE             :Int = 10;
    public static var DOCUMENT_FRAGMENT_NODE         :Int = 11;
    public static var NOTATION_NODE                  :Int = 12;
}

class DocumentPosition {
    public static var DOCUMENT_POSITION_DISCONNECTED                :Int = 0x01;
    public static var DOCUMENT_POSITION_PRECEDING                   :Int = 0x02;
    public static var DOCUMENT_POSITION_FOLLOWING                   :Int = 0x04;
    public static var DOCUMENT_POSITION_CONTAINS                    :Int = 0x08;
    public static var DOCUMENT_POSITION_CONTAINED_BY                :Int = 0x10;
    public static var DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC     :Int = 0x20;
}

class DerivationMethod {
    public static var DERIVATION_RESTRICTION         :Int = 1;
    public static var DERIVATION_EXTENSION           :Int = 2;
    public static var DERIVATION_UNION               :Int = 4;
    public static var DERIVATION_LIST                :Int = 8;
}

class OperationType {
    public static var NODE_CLONED                    :Int = 1;
    public static var NODE_IMPORTED                  :Int = 2;
    public static var NODE_DELETED                   :Int = 3;
    public static var NODE_RENAMED                   :Int = 4;
    public static var NODE_ADOPTED                   :Int = 5;
}

class ErrorState {
    public static var NETWORK_EMPTY                  :Int = 0;
    public static var NETWORK_IDLE                   :Int = 1;
    public static var NETWORK_LOADING                :Int = 2;
    public static var NETWORK_NO_SOURCE              :Int = 3;
}

class ReadyState {
    public static var CONNECTING                     :Int = 0;
    public static var OPEN                           :Int = 1;
    public static var CLOSED                         :Int = 2;
}

class EventExceptionCode {
    public static var UNSPECIFIED_EVENT_TYPE_ERR     :Int = 0;
}

class DeltaModeCode {
    public static var DOM_DELTA_PIXEL                :Int = 0x00;
    public static var DOM_DELTA_Line                 :Int = 0x01;
    public static var DOM_DELTA_Page                 :Int = 0x02;
}

class InputModeCode {
    public static var DOM_INPUT_METHOD_UNKNOWN       :Int = 0x00;
    public static var DOM_INPUT_METHOD_KEYBOARD      :Int = 0x01;
    public static var DOM_INPUT_METHOD_PASTE         :Int = 0x02;
    public static var DOM_INPUT_METHOD_DROP          :Int = 0x03;
    public static var DOM_INPUT_METHOD_IME           :Int = 0x04;
    public static var DOM_INPUT_METHOD_OPTION        :Int = 0x05;
    public static var DOM_INPUT_METHOD_HANDWRITING   :Int = 0x06;
    public static var DOM_INPUT_METHOD_VOICE         :Int = 0x07;
    public static var DOM_INPUT_METHOD_MULTIMODAL    :Int = 0x08;
    public static var DOM_INPUT_METHOD_SCRIPT        :Int = 0x09;
}


class KeyLocationCode {
    public static var DOM_KEY_LOCATION_STANDARD      :Int = 0x00;
    public static var DOM_KEY_LOCATION_LEFT          :Int = 0x01;
    public static var DOM_KEY_LOCATION_RIGHT         :Int = 0x02;
    public static var DOM_KEY_LOCATION_NUMPAD        :Int = 0x03;
    public static var DOM_KEY_LOCATION_MOBILE        :Int = 0x04;
    public static var DOM_KEY_LOCATION_JOYSTICK      :Int = 0x05;
}

class PhaseType {
    public static var CAPTURING_PHASE                :Int = 1;
    public static var AT_TARGET                      :Int = 2;
    public static var BUBBLING_PHASE                 :Int = 3;
}

class AttrChangeType {
    public static var MODIFICATION                   :Int = 1;
    public static var ADDITION                       :Int = 2;
    public static var REMOVAL                        :Int = 3;
}

class AcceptNodeConstants {
    public static var FILTER_ACCEPT                  :Int = 1;
    public static var FILTER_REJECT                  :Int = 2;
    public static var FILTER_SKIP                    :Int = 1;
}


class WhatToShowConstants {
    public static var SHOW_ALL                       :Int = 0xFFFFFFFF;
    public static var SHOW_ELEMENT                   :Int = 0x00000001;
    public static var SHOW_ATTRIBUTE                 :Int = 0x00000002;
    public static var SHOW_TEXT                      :Int = 0x00000004;
    public static var SHOW_CDATA_SECTION             :Int = 0x00000008;
    public static var SHOW_ENTITY_REFERENCE          :Int = 0x00000010;
    public static var SHOW_ENTITY                    :Int = 0x00000020;
    public static var SHOW_PROCESSING_INSTRUCTION    :Int = 0x00000040;
    public static var SHOW_COMMENT                   :Int = 0x00000080;
    public static var SHOW_DOCUMENT                  :Int = 0x00000100;
    public static var SHOW_DOCUMENT_TYPE             :Int = 0x00000200;
    public static var SHOW_DOCUMENT_FRAGMENT         :Int = 0x00000400;
    public static var SHOW_NOTATION                  :Int = 0x00000800;
}

class RangeExceptionCode {
    public static var BAD_BOUNDARYPOINTS_ERR         :Int = 1;
    public static var INVALID_NODE_TYPE_ERR          :Int  = 2;
}

class CompareHow {
    public static var START_TO_START                 :Int = 0;
    public static var START_TO_END                   :Int = 1;
    public static var END_TO_END                     :Int = 2;
    public static var END_TO_START                   :Int = 3;
}

class RuleType {
    public static var UNKNOWN_RULE                   :Int = 0;
    public static var STYLE_RULE                     :Int = 1;
    public static var CHARSET_RULE                   :Int = 2;
    public static var IMPORT_RULE                    :Int = 3;
    public static var MEDIA_RULE                     :Int = 4;
    public static var FONT_FACE_RULE                 :Int = 5;
    public static var PAGE_RULE                      :Int = 6;    
}

class CSSValueType {
    public static var CSS_INHERIT                    :Int = 0;
    public static var CSS_PRIMITIVE_VALUE            :Int = 1;
    public static var CSS_VALUE_LIST                 :Int = 2;
    public static var CSS_CUSTOM                     :Int = 3;
}

class PrimitiveType {
    public static var CSS_UNKNOWN                    :Int = 0;
    public static var CSS_NUMBER                     :Int = 1;
    public static var CSS_PERCENTAGE                 :Int = 2;
    public static var CSS_EMS                        :Int = 3;
    public static var CSS_EXS                        :Int = 4;
    public static var CSS_PX                         :Int = 5;
    public static var CSS_CM                         :Int = 6;
    public static var CSS_MM                         :Int = 7;
    public static var CSS_IN                         :Int = 8;
    public static var CSS_PT                         :Int = 9;
    public static var CSS_PC                         :Int = 10;
    public static var CSS_DEG                        :Int = 11;
    public static var CSS_RAD                        :Int = 12;
    public static var CSS_GRAD                       :Int = 13;
    public static var CSS_MS                         :Int = 14;
    public static var CSS_S                          :Int = 15;
    public static var CSS_HZ                         :Int = 16;
    public static var CSS_KHZ                        :Int = 17;
    public static var CSS_DIMENSION                  :Int = 18;
    public static var CSS_STRING                     :Int = 19;
    public static var CSS_URI                        :Int = 20;
    public static var CSS_IDENT                      :Int = 21;
    public static var CSS_ATTR                       :Int = 22;
    public static var CSS_COUNTER                    :Int = 23;
    public static var CSS_RECT                       :Int = 24;
    public static var CSS_RGBCOLOR                   :Int = 25;
}

class UpdateStatus {
    public static var UNCACHED                       :Int = 0;
    public static var IDLE                           :Int = 1;
    public static var CHECKING                       :Int = 2;
    public static var DOWNLOADING                    :Int = 3;
    public static var UPDATEREADY                    :Int = 4;    
}

class ErrorSeverity {
    public static var SEVERITY_WARNING               :Int = 1;
    public static var SEVERITY_ERROR                 :Int = 2;
    public static var SEVERITY_FATAL_ERROR           :Int = 3;
}








