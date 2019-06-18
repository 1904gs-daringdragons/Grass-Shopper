const Sequelize = require('sequelize')
const db = require('../db')

const Recommendation = db.define('recommendation', {
  stars: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  }
})

module.exports = Recommendation
