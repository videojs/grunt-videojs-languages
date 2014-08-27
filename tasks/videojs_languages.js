'use strict';

var path = require('path');
var util = require('util');

module.exports = function(grunt) {
  grunt.registerMultiTask('vjslanguages', 'A Grunt plugin for compiling VideoJS language assets.', function() {
    this.files.forEach(function(f) {
      var languageName, languageData, jsTemplate, jsFilePath;
      // Multiple Files Case
      if(util.isArray(f.src)){
        for(var i =0; i < f.src.length; i++) {
          console.log('-', f.src[i], f.dest);
          languageName = path.basename(f.src[i], '.json');
          languageData = grunt.file.readJSON(f.src[i]);
          jsTemplate = 'videojs.addLanguage("' + languageName + '",' + JSON.stringify(languageData,null,' ') + ');';
          jsFilePath = path.join(f.dest, languageName + '.js');
          grunt.file.write(jsFilePath, jsTemplate);
          grunt.log.writeln('- [' + languageName +'] Language Built. File "' + jsFilePath + '" created.');
        }
      }
      // Singular File Case
      else {
        languageName = path.basename(f.src, '.json');
        languageData = grunt.file.readJSON(f.src);
        jsTemplate = 'videojs.addLanguage("' + languageName + '",' + JSON.stringify(languageData,null,' ') + ');';
        jsFilePath = path.join(f.dest, languageName + '.js');
        grunt.file.write(jsFilePath, jsTemplate);
        grunt.log.writeln('- [' + languageName +'] Language Built. File "' + jsFilePath + '" created.');
      }
    });
  });
};