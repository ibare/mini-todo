var should = require('chai').should();
var supertest = require('supertest');
var request = supertest('localhost:3000');

describe('TODO API', function() {
  it('GET /api/todos/archive', function(done) {
    request
      .get('/api/todos/archive')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done()
      });
  });
});