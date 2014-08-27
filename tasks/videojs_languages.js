'use strict';

var path = require('path');

module.exports = function(grunt) {
  grunt.registerMultiTask('vjslanguages', 'A Grunt plugin for compiling VideoJS language assets.', function() {

    this.files.forEach(function(f) {
      var languageName = path.basename(f.src, '.json');
      var languageData = grunt.file.readJSON(f.src);
      var jsTemplate = 'videojs.addLanguage("' + languageName + '",' + JSON.stringify(languageData) + ');';
      var jsFilePath = path.join(f.dest, languageName + '.js');
      grunt.file.write(jsFilePath, jsTemplate);
      grunt.log.writeln('- [' + languageName +'] Language Built. File "' + jsFilePath + '" created.');
    });
  });
};
