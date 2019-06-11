const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  products: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    defaultValue: []
  }
})

module.exports = Cart
