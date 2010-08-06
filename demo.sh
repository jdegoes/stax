#!/bin/sh
haxe -cp ./src/main/haxe/ -cp ./src/demo/haxe/ -js demo.js -main Demo
open demo.html
