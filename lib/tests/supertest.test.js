'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const server = require('../../index');
const { addDatabaseHooks } = require('./utils');
let token;
suite(
  'mail route',
  addDatabaseHooks(() => {
    suite('with token', () => {
      const agent = request.agent(server);

      beforeEach(done => {
        request(server)
          .post('/authenticate')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .send({
            email: 'idalia@gmail.com',
            password: 'idalia123'
          })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            var result = res.body;

            token = result.token;
            // console.log(token, 'this is the test token');
            return done();
          });
      });

      test('GET /users/1/mail', done => {
        agent
          .get('/users/1/mail')
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(
            200,
            [
              {
                id: 1,
                name: 'Iceland',
                address_line1: '229 haight st 176',
                address_line2: '',
                address_city: 'San Francisco',
                address_state: 'CA',
                address_zip: '94102'
              }
            ],
            done
          );
      });

      test('GET /mails/1', done => {
        agent
          .get('/mails/1')
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + token)
          // .expect('Accept', 'application/json')
          .expect(200, done);
      });

      test('POST /mail', done => {
        agent
          .post('/users/1/mail')
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + token)
          .send({
            name: 'Idalia',
            address_line1: '229 haight st 176',
            address_line2: '',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94102',
            message: 'hello'
          })
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(res => {
            delete res.body.createdAt;
            delete res.body.updatedAt;
          })
          .expect(
            200,
            {
              id: 1,
              name: 'Idalia',
              address_line1: '229 haight st 176',
              address_line2: '',
              address_city: 'San Francisco',
              address_state: 'CA',
              address_zip: '94102',
              message: 'hello'
            },
            done
          );
      });

      test('POST /mails with non-integer mailId', done => {
        agent
          .post('/mails')
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + token)
          .send({ mailId: 'two' })
          .expect('Content-Type', /plain/)
          .expect(404, 'Not Found', done);
      });

      test('POST /mails with unknown mailId', done => {
        agent
          .post('/mails')
          .set('Accept', 'text/plain; charset=utf-8')
          .set('Authorization', 'Bearer ' + token)
          .send({ mailId: 2000 })
          .expect('Content-Type', 'text/plain; charset=utf-8')
          .expect(404, 'Not Found', done);
      });
    });
    // WITHOUT TOKEN///////////////////////////////////////////////
    suite('without token', () => {
      test('GET /mails', done => {
        request(server)
          .get('/users/1/mails')
          .set('Accept', 'application/json')
          .expect('Content-Type', /plain/)
          .expect(401, 'Unauthorized', done);
      });

      test('POST /mails', done => {
        request(server)
          .post('/users/1/mails')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .send({
            name: 'Idalia',
            address_line1: '229 haight st 176',
            address_line2: '',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94102',
            message: 'hello'
          })
          .expect('Content-Type', 'text/plain; charset=utf-8')
          .expect(401, 'Unauthorized', done);
      });
    });
  })
);
test('POST /mails with non-integer mailId', done => {
  request(server)
    .post('/mails')
    .set('Accept', 'application/json')
    .send({ mailId: 'two' })
    .expect('Content-Type', /plain/)
    .expect(404, 'Not Found', done);
});
describe('App', () => {
  it('should be able to run tests', () => {
    expect(1 + 2).toEqual(3);
  });
});
//connection of test db, user does not exist, seed must not be working..
