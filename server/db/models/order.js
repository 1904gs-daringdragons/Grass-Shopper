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
  payPalConfirmationNumber: {
    type: Sequelize.STRING
    // allowNull: false
  },
  totalPrice: {
    type: Sequelize.INTEGER
  },

  shippingAddress: {
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

  shippingState: {
    type: Sequelize.STRING
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
  },
  isGuest: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
})

module.exports = Order
