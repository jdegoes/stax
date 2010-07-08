#!/bin/bash
haxe -cp ./src/main/haxe/ -cp ./src/test/haxe/ -js test.js -main TestSuite && ${BROWSER:-google-chrome} test.html
