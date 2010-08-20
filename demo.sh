#!/bin/sh
haxe -cp ./src/main/haxe/ -cp ./src/demo/haxe/ -js demo.js --js-namespace hxrt -main Demo
tools/minify-js < demo.js > demo.min.js
open demo.html
