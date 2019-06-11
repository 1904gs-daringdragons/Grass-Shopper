const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')

describe('order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('post /api/orders', () => {
    const dummyOrder = {
      recipientName: 'Eric',
      conformationEmail: 'confirm@email.email',
      price: 100.0,
      address: '123 fake st',
      city: 'townsville',
      state: 'utah',
      zipcode: 55555
    }

    it('saves a submitted order to the db', async () => {
      await request(app)
        .post('/api/orders')
        .send(dummyOrder)
        .expect(204)
    })
  })
})
