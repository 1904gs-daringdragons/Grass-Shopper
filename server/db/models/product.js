const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 0
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue:
      'https://images.unsplash.com/photo-1457573557536-6b4b6ca9a05e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80'
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  quantity: {
    type: Sequelize.BIGINT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  isFeatured: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  featuredUrl: {
    type: Sequelize.STRING
  }
})

module.exports = Product
