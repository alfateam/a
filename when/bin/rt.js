#!/usr/bin/env node

var cwd = process.cwd();
var glob = require('glob');

glob(cwd + '/**[!node_modules]/when*.js', function(err, files) {
    for(var i in files.reverse()) {
      require(files[i]);
    }
    process.summary();
});
