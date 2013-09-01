/**
 * Module Dependencies
 */

var readfile = require('./');

/**
 * Read the file
 */

readfile('./package.json', 'utf8', function(err, content) {
  console.log('fresh content', content);
  readfile('./package.json', 'utf8', function(err, content) {
    console.log('cached content', content);
  });
});
