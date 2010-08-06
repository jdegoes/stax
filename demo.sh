#!/bin/sh
haxe -cp ./src/main/haxe/ -cp ./src/demo/haxe/ -js demo.js --js-namespace haxe.lang -main Demo
open demo.html
