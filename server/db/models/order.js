const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderStatus: {
    type: Sequelize.ENUM,
    values: ['CREATED', 'PROCESSING', 'CANCELLED', 'SHIPPED', 'COMPLETED'],
    defaultValue: 'CREATED',
    allowNull: false
  },
  recipientName: {
    type: Sequelize.STRING
  },
  confirmationEmail: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  zipcode: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Order
