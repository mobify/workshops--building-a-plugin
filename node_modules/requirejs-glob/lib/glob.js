/**
 * glob.js
 * A RequireJS plugin for loading multiple files that match a glob pattern.
 * See https://github.com/OpenWebStack/requirejs-glob for details
 * 
 * Copyright 2013 Dave Geddes 
 * @geddski heygeddski@gmail.com
 * MIT License
 */

define(function(){
  var buildFiles = {};

  function mergeOptions(defaults, options) {
    for (option in options) {
      if (options.hasOwnProperty(option)) {
        defaults[option] = options[option]
      }
    }
  }

  return {
    /**
     * load matched files, using the server to help find matches
     */
    load:function(name, req, load, config) {
      var files;

      var options = {
        path: '.',
        middlewarePathPrefix: '',
      }

      // config.glob used to be a string with the `path` value. This usage
      // is deprecated. Now, an object should be used for configuration.
      if (typeof(config.glob) === 'object') {
        mergeOptions(options, config.glob)
      } else {
        if (typeof(options.path) !== 'undefined') {
          options.path = config.glob;
        }
      }

      // during the build we load the actual file contents in Node
      if (config.isBuild){
        var glob = require.nodeRequire('requirejs-glob');
        files = glob.contents(name, options.path);
        buildFiles[name] = [];
        files.forEach(function(file){
          buildFiles[name].push(file);
        });
        load(files);
      }
      else{
        // in the browser we just request matching files from the Node web service
        var xhr = new XMLHttpRequest();
        var url = options.middlewarePathPrefix +
                  'requirejs-glob?' +
                  'glob=' + encodeURIComponent(name) +
                  '&from=' + encodeURIComponent(options.path);
        xhr.open('GET', url);
        xhr.send();
        xhr.onreadystatechange = function(){
          if (xhr.readyState === 4){
            files = JSON.parse(xhr.responseText);
            //load all the files with RequireJS
            req(files, function(){
              load(files);
            });
          }
        };
      }
    },

    /**
     * write contents of matched files during the build
     */
    write:function(pluginName, name, write) {
      if (name in buildFiles) {
        //write the glob module
        write('define("glob!'+name+'");');
        //write the contents of the matched files
        var files = buildFiles[name];
        files.forEach(function(file){
          write(file);
        });
      }
    }
  };
});
