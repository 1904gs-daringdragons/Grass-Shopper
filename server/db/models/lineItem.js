const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('lineitem', {
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
  },
  itemPrice: {
    type: Sequelize.INTEGER
    // allowNull: false,
    // validate: {
    //   isInt: true,
    //   min: 0
    // }
  },
  address: {
    type: Sequelize.STRING,
    // allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  city: {
    type: Sequelize.STRING,
    // allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  state: {
    type: Sequelize.STRING,
    // allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  zipcode: {
    type: Sequelize.INTEGER,
    // allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = LineItem
