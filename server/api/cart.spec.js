const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Cart = db.model('cart')

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/cart', () => {
    const codyUser = {
      email: 'cody@puppybook.com',
      firstName: 'cody',
      lastName: 'pug'
    }

    beforeEach(() => {})

    it('adds a new cart on post, and gets a cart by id', async () => {
      let cody = await User.create(codyUser)
      await request(app)
        .post('/api/cart')
        .send({userId: cody.id})
        .expect(204)

      await request(app)
        .get(`/api/cart/${cody.id}`)
        .expect(200)
    })

    it('updates a cart', async () => {
      let cody = await User.create(codyUser)
      await request(app)
        .post('/api/cart')
        .send({userId: cody.id})
        .expect(204)

      await request(app)
        .put('/api/cart')
        .send({userId: cody.id, products: {p1: 10, p2: 3}})
        .expect(204)
    })
  })
})
