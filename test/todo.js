var should = require('chai').should();
var supertest = require('supertest');
var request = supertest('localhost:3000');

describe('TODO API', function() {
  it('GET /api/todos', function(done) {
    request
      .get('/api/todos')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done()
      });
  });

  it('GET /health', function(done) {
    request
      .get('/health')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done()
      });
  });
});