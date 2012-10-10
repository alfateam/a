#!/usr/bin/env node

var cwd = process.cwd();
var glob = require('glob');

glob(cwd + '/**/when*.js', function(err, files) {
    for(var i in files.reverse()) {
      if( files[i].indexOf('node_modules') >= 0 ) continue;
      require(files[i]);
    }
    process.summary();
});
