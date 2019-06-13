const {expect} = require('chai')
const request = require('supertest')
const session = require('supertest-session')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
describe('cart routes', () => {
  let cody
  const authSession = session(app)

  beforeEach(async () => {
    db.sync({force: true})
    cody = await User.create({
      email: 'cody@puppybook.com',
      firstName: 'cody',
      lastName: 'pug',
      isAdmin: true
    })
    await authSession
      .post('/auth/login')
      .send({email: 'cody@puppybook.com', password: '123'})
      .expect(200)
    
  })
})

describe('put /api/cart', () => {
  it('does nothing if not logged in', async () => {
    await request(app)
      .put('api/cart')
      .send({userId: 1, productId: 1, quantity: 1})
      .expect(403)
  })
})
