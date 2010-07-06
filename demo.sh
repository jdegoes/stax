#!/bin/sh
haxe -cp ./src/main/haxe/ -cp ./src/test/haxe/ -js demo.js -main HaXeDemo
open demo.html
