const {expect} = require('chai')
const request = require('supertest')
const session = require('supertest-session')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Cart = db.model('cart')

describe('Authenticated cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/cart', async () => {
    const codyUser = {
      email: 'cody@puppybook.com',
      firstName: 'cody',
      lastName: 'pug',
      password: '123'
    }

    let authSession = session(app)
    let cody = await User.create(codyUser)

    beforeEach(async () => {
      await authSession
        .post('/auth/login')
        .send({email: 'cody@puppybook.com', password: '123'})
        .expect(200)
    })

    it('adds a new cart on post, and gets a cart by id', async () => {
      await authSession
        .post('/api/cart')
        .send({userId: 1})
        .expect(204)

      await authSession.get(`/api/cart/${1}`).expect(200)
    })

    it('updates a cart', async () => {
      const newCart = await Cart.create()
      await newCart.setUser(cody)
      await authSession
        .put('/api/cart')
        .send({userId: 1, products: {p1: 10, p2: 3}})
        .expect(204)
    })
  })
})
