#!/usr/bin/env bash

./node_modules/.bin/jshint  --config .jshintrc *.js
./node_modules/.bin/mocha *Test.js --require config.js
