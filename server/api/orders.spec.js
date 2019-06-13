const {expect} = require('chai')
const request = require('supertest')
const session = require('supertest-session')

const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('post /api/orders', () => {
    const dummyOrder = {
      recipientName: 'Eric',
      conformationEmail: 'confirm@email.email',
      price: 100.0,
      billingAddress: '123 fake st',
      billingCity: 'townsville',
      billingState: 'utah',
      billingZipcode: 55555,
      userId: 0
    }

    const codyUser = {
      email: 'cody@puppybook.com',
      firstName: 'cody',
      lastName: 'pug'
    }

    it('saves a submitted guest order to the db', async () => {
      await request(app)
        .post('/api/orders')
        .send(dummyOrder)
        .expect(204)
    })

    it('saves a registered user order to the db', async () => {})
  })
})
