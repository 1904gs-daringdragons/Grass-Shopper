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
        .send({...dummyOrder})
        .expect(204)
    })

    it('saves a submitted user order to the db', async () => {
      const cody = await User.create({...codyUser})
      const codyOrder = {...dummyOrder}
      codyOrder.userId = cody.id
      await request(app)
        .post('/api/orders')
        .send({...dummyOrder})
        .expect(204)
    })
  })

  describe(' GET api/orders', () => {
    let authSession = session(app)
    let notSession = session(app)
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

    beforeEach(async () => {
      await User.create({
        email: 'cody@puppybook.com',
        firstName: 'Cody',
        lastName: 'Pug',
        password: '123',
        isAdmin: true
      })
      await User.create({
        email: 'dody@puppybook.com',
        firstName: 'dody',
        lastName: 'dug',
        password: '321',
        isAdmin: false
      })
      await request(app)
        .post('/api/orders')
        .send({...dummyOrder})
        .expect(204)
    })

    it('sends all orders to a logged in admin', async () => {
      await authSession
        .post('/auth/login')
        .send({email: 'cody@puppybook.com', password: '123'})
        .expect(200)
      const res = await authSession.get('/api/orders').expect(200)
      expect(res.body).to.be.an('array')
    })
    it('doesnt send all orders to anyone else', async () => {
      await notSession
        .post('/auth/login')
        .send({email: 'dody@puppybook.com', password: '321'})
        .expect(200)
      const res = await notSession.get('/api/orders').expect(403)
    })
  })
})
