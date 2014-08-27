'use strict';

var path = require('path');
var util = require('util');

module.exports = function(grunt) {
  grunt.registerMultiTask('vjslanguages', 'A Grunt plugin for compiling VideoJS language assets.', function() {

    var createLanguageFile = function(languageName, languageData, jsFilePath) {
      var jsTemplate = 'videojs.addLanguage("' + languageName + '",' + JSON.stringify(languageData,null,' ') + ');';

      grunt.file.write(jsFilePath, jsTemplate);
      grunt.log.writeln('- [' + languageName +'] Language Built. File "' + jsFilePath + '" created.');
    };

    this.files.forEach(function(f) {
      var languageName, languageData, jsFilePath;
      // Multiple Files Case
      if(util.isArray(f.src)){
        for(var i =0; i < f.src.length; i++) {
          languageName = path.basename(f.src[i], '.json');
          languageData = grunt.file.readJSON(f.src[i]);
          jsFilePath = path.join(f.dest, languageName + '.js');
          createLanguageFile(languageName, languageData, jsFilePath);
        }
      }
      // Singular File Case
      else {
        languageName = path.basename(f.src, '.json');
        languageData = grunt.file.readJSON(f.src);
        jsFilePath = path.join(f.dest, languageName + '.js');
        createLanguageFile(languageName, languageData, jsFilePath);
      }
    });
  });
};