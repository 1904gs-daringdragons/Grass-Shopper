/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const sunnyName = "Sunny's Kush"
    let newProduct = {}
    // This spec was changed to include firstName and lastName,
    // but we should also address the fact that they were failing
    // when not given this info.

    beforeEach(async () => {
      newProduct = await Product.create({
        name: sunnyName,
        price: '550',
        imageUrl:
          'https://hightimes.com/wp-content/uploads/2018/07/how-grind-weed-without-grinder-featured.jpg',
        description: 'A specially made blend by Sunny'
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(sunnyName)
    })
    it(`GET /api/products/${newProduct.id}`, async () => {
      const res = await request(app)
        .get(`/api/products/${newProduct.id}`)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(sunnyName)
    })
  }) // end describe('/api/products')
}) // end describe('User routes')
