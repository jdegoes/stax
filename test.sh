#!/bin/sh
haxe -cp ./src/main/haxe/ -cp ./src/test/haxe/ -js test.js -main TestSuite
open test.html
