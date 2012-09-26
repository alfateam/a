#!/usr/bin/env node

var cwd = process.cwd();
var glob = require('glob');
var summary = require('a').when.summary;
glob(cwd + '/**/when*.js', function(err, files) {
    for(var i in files.reverse()) {
      require(files[i]);
    }
    summary();
});
