#!/usr/bin/env node

var cwd = process.cwd();
var glob = require('glob');
var summary = require('when').summary;
glob(cwd + '/**/when*.js', function(err, files) {
    for(var i in files.reverse()) {
      require(files[i].replace(/\.js$/, ''));
    }
    summary();
});
