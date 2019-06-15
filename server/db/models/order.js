const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderStatus: {
    type: Sequelize.ENUM,
    values: [
      'CART',
      'CREATED',
      'PROCESSING',
      'CANCELLED',
      'SHIPPED',
      'COMPLETED'
    ],
    defaultValue: 'CREATED',
    allowNull: false
  },
  recipientName: {
    type: Sequelize.STRING
  },
  confirmationEmail: {
    type: Sequelize.STRING
  },
  confirmationNumber: {
    type: Sequelize.INTEGER
    // allowNull: false
  },
  totalPrice: {
    type: Sequelize.INTEGER
  },
  billingAddress: {
    type: Sequelize.STRING
    // allowNull: false,
    // validate: {
    // 	notEmpty: true
    // }
  },
  shippingAddress: {
    type: Sequelize.STRING
    // allowNull: false,
    // validate: {
    // 	notEmpty: true
    // }
  },
  billingCity: {
    type: Sequelize.STRING
    // allowNull: false,
    // validate: {
    // 	notEmpty: true
    // }
  },
  shippingCity: {
    type: Sequelize.STRING
    // allowNull: false,
    // validate: {
    // 	notEmpty: true
    // }
  },
  billingState: {
    type: Sequelize.STRING
    // allowNull: false,
    // validate: {
    // 	notEmpty: true
    // }
  },
  shippingState: {
    type: Sequelize.STRING
    // allowNull: false,
    // validate: {
    // 	notEmpty: true
    // }
  },
  billingZipcode: {
    type: Sequelize.INTEGER
    // allowNull: false,
    // validate: {
    // 	notEmpty: true
    // }
  },
  shippingZipcode: {
    type: Sequelize.INTEGER
    // allowNull: false,
    // validate: {
    // 	notEmpty: true
    // }
  }
})

module.exports = Order
