/**
 * server-side companion to the glob.js plugin
 * See https://github.com/OpenWebStack/requirejs-glob for details
 * 
 * Copyright 2013 Dave Geddes 
 * @geddski heygeddski@gmail.com
 * MIT License
 */

var globsync = require('glob-whatev');
var path = require('path');
var fs = require('fs');
var url = require('url');

/**
 * Connect / Express middleware web service called by the glob! plugin in the browser
 * @return {Array} matching file paths for RequireJS to load
 */
module.exports = function(){
  return function(req, res, next){
    if (req.url.match(/^\/requirejs-glob/)){
      var query = url.parse(req.url, true).query;
      var json = JSON.stringify(module.exports.match(query.glob, query.from));
      res.end(json);
    }
    else next();
  };
};

function removeExtension(filepath) {
  var extension = path.extname(filepath);
  return filepath.substring(0, filepath.length - extension.length);
}

/**
 * @return {Array} file paths that match the glob
 */
module.exports.match = function(glob, from){
  var files = [];
  var fullGlob = path.join(from, glob);
  globsync.glob(fullGlob).forEach(function(filepath) {
    files.push(removeExtension(filepath));
  });
  return files;
};

/**
 * function called by glob! plugin during the build
 * @return {Array} file buffers that match the glob
 */
module.exports.contents = function(glob, from){
  var files = module.exports.match(glob, from);
  files = files.map(function(file){
    //default to .js extension
    var ext = path.extname(file) || '.js';
    return fs.readFileSync(from + file + ext);
  });
  return files;
};
