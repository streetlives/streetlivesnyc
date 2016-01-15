'use strict';

var assert = require('assert');

var Config = require('../lib/config')('test');
var SL = require('../lib/streetlives.js')(Config);

suite('SL', function() {
  test('empty_test', function(done) {
    assert.equal(true, true);
    done();
  });
});
