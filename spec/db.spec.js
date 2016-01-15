'use strict';

var assert = require('assert');

var Config = require('../lib/config')('test');
var DB = require('../lib/db.js')(Config);

suite('DB', function() {
  test('empty_test', function(done) {
    assert.equal(true, true);
    done();
  });
});
