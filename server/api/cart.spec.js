const {expect} = require('chai')
const request = require('supertest')
const session = require('supertest-session')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Product = db.model('product')

describe('cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('put /api/cart', () => {
    let cody
    const authSession = session(app)

    it('does nothing if not logged in', async () => {
      await request(app)
        .put('/api/cart')
        .send({userId: 0, productId: 1, quantity: 1})
        .expect(403)
    })

    it('does nothing if attempting to alter another user cart', async () => {
      cody = await User.create({
        email: 'cody@puppybook.com',
        firstName: 'cody',
        lastName: 'pug',
        password: '123',
        isAdmin: true
      })
      await authSession
        .post('/auth/login')
        .send({email: 'cody@puppybook.com', password: '123'})
        .expect(200)

      await authSession
        .put('/api/cart')
        .send({userId: 2, productId: 1, quantity: 1})
        .expect(403)
    })

    it('adds to a logged in user cart', async () => {
      cody = await User.create({
        email: 'cody@puppybook.com',
        firstName: 'cody',
        lastName: 'pug',
        password: '123',
        isAdmin: true
      })
      await Product.create({
        name: 'weed',
        price: '550',
        imageUrl:
          'https://hightimes.com/wp-content/uploads/2018/07/how-grind-weed-without-grinder-featured.jpg',
        description: 'A specially made blend by Sunny'
      })
      await authSession
        .post('/auth/login')
        .send({email: 'cody@puppybook.com', password: '123'})
        .expect(200)

      await authSession
        .put('/api/cart')
        .send({userId: 1, productId: 1, quantity: 1})
        .expect(204)
    })
  })
})
