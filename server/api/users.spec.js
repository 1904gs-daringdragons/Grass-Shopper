/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const session = require('supertest-session')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    // This spec was changed to include firstName and lastName,
    // but we should also address the fact that they were failing
    // when not given this info.

    let authSession = session(app)

    beforeEach(async () => {
      await User.create({
        email: codysEmail,
        firstName: 'Cody',
        lastName: 'Pug',
        password: '123',
        isAdmin: true
      })
      await authSession
        .post('/auth/login')
        .send({email: 'cody@puppybook.com', password: '123'})
        .expect(200)
    })

    it('GET /api/users', async () => {
      const res = await authSession.get('/api/users').expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
