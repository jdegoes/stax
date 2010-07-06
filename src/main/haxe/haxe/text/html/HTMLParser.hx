package haxe.text.html;

#if js
using Lambda;

import haxe.hDom.Dom;
#end

class HTMLParser {
  #if js
  public static function parseIntoElements (s: String): Array<Node> {
    var d                      = Lib.document,
        container: HTMLElement = cast d.createElement ("div"),
        convert_script         = function (node_as_text): Node {var r = ~/^<script ([^>]+)>/, new_script_node = d.createElement ("script");
                                                                if (r.match (node_as_text)) ~/(\w+)=(["'])([^\1]*)\1/.customReplace (r.matched (1), function (matches) {
                                                                                              new_script_node.setAttribute (matches.matched (1), matches.matched (3)); return "";});
                                                                var r2 = ~/^<script[^>]*>(.*)<\/script>/, can_have_children = untyped (new_script_node.canHaveChildren);
                                                                if (r2.match (node_as_text)) if (can_have_children == null || can_have_children) new_script_node.appendChild (d.createTextNode (r2.matched (1)));
                                                                                             else                                                untyped (new_script_node.text = r2.matched (1));
                                                                return new_script_node;},
        parsed                 = parse (s);

    container.innerHTML = parsed[0];
    return Lambda.map ({iterator: function (): Iterator<Int> {return new IntIter (0, container.childNodes.length);}}, function (i) {return container.childNodes[i];}).array().concat (
           parsed.slice (1).map (convert_script).array());
  }
  #end

  public static function parse (s: String): Array<String> {
    var min                  = function (x, y) {return x < y ? x : y;},
        max                  = function (x, y) {return x > y ? x : y;},

        next                 = function (s, search: String, mark, previous) {return (previous > mark) ? previous : ((mark = s.indexOf (search, mark)) == -1) ? s.length : mark;},

        end_of_string        = function (start: Int, s: String) {var mark = start + 1, back_mark = start, quote_mark = start, quote = s.charAt (start);
                                                                 while ((quote_mark = next (s, quote, mark, quote_mark)) > (back_mark = next (s, "\\", mark, back_mark))) mark = back_mark + 2;
                                                                 return quote_mark;},

        end_of_line_comment  = function (start: Int, s: String): Int {return next (s, "\n",  start, start);},
        end_of_block_comment = function (start: Int, s: String): Int {return next (s, "*/",  start + 2, start + 2);},
        end_of_cdata         = function (start: Int, s: String): Int {return next (s, "]]>", start, start);},
        end_of_comment       = function (start: Int, s: String): Int {return next (s, "-->", start + 4, start + 4);},

        end_of_script        = function (start, s: String, l) {var mark = start, line_comment_mark = start, block_comment_mark = start, single_string_mark = start, double_string_mark = start,
                                                                                 cdata_mark        = start, close_script_mark  = start;

                                                               while ((close_script_mark = next (l, "</script>", mark, close_script_mark)) % s.length >
                                                                      (mark = min (min (min (single_string_mark = next (s, "'",  mark, single_string_mark),
                                                                                             double_string_mark = next (s, "\"", mark, double_string_mark)),
                                                                                        cdata_mark = next (s, "<![CDATA[", mark, cdata_mark)),
                                                                                   min (line_comment_mark  = next (s, "//", mark, line_comment_mark),
                                                                                        block_comment_mark = next (s, "/*", mark, block_comment_mark)))))

                                                                 mark = ((mark == single_string_mark || mark == double_string_mark) ? end_of_string :
                                                                                                       (mark ==  line_comment_mark) ? end_of_line_comment :
                                                                                                       (mark == block_comment_mark) ? end_of_block_comment :
                                                                                                                                      end_of_cdata) (mark, s) + 1;
                                                               return close_script_mark + 9;},

        next_script          = function (start, s: String, l) {var mark = start, cdata_mark = start, comment_mark = start, script_mark = start;
                                                               while ((script_mark = next (l, "<script", mark, script_mark)) % s.length >
                                                                      (mark = min (cdata_mark   = next (s, "<![CDATA[", mark, cdata_mark),
                                                                                   comment_mark = next (s, "<!--",      mark, comment_mark))))
                                                                 mark = ((mark == cdata_mark) ? end_of_cdata : end_of_comment) (mark, s);
                                                               return script_mark;},
        mark                 = 0,
        last_mark            = 0,
        scripts              = [],
        rest                 = [],
        lowercase            = s.toLowerCase ();

    while ((mark = next_script (mark, s, lowercase)) < s.length) {
      rest.push (s.substr (last_mark, mark - last_mark));
      scripts.push (s.substr (mark, - (mark - (mark = end_of_script (s.indexOf (">", mark), s, lowercase)))));
      last_mark = mark;
    }

    rest.push (s.substr (last_mark));
    return [rest.join("")].concat (scripts);
  }
}
