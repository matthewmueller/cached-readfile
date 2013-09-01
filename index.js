/**
 * Module Dependencies
 */

var fs = require('fs');
var path = require('path');
var resolve = path.resolve;

/**
 * in-memory file cache
 */

var files = {};

/**
 * Expose `readFile`
 */

module.exports = readfile;

/**
 * readfile
 *
 * @param {String} filename
 * @param {Object|String} options
 * @param {Function} fn
 * @api public
 */

function readfile(filename, options, fn) {
  var filename = resolve(filename);
  if (2 == arguments.length) {
    fn = options;
    options = {};
  }

  if (!files[filename]) files[filename] = {};
  var file = files[filename];

  fs.stat(filename, function(err, stats) {
    if (err) return fn(err);
    else if (file.mtime >= stats.mtime) return fn(null, file.content);

    fs.readFile(filename, options, function(err, str) {
      if (err) return fn(err);
      files[filename] = {
        mtime: stats.mtime,
        content: str
      };

      fn(null, str);
    });
  });
}
