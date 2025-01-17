const User = require('./user')
const Product = require('./product')
const LineItem = require('./lineItem')
const Order = require('./order')
const Recommendation = require('./recommendation')

LineItem.belongsTo(Product)
LineItem.belongsTo(Order)
Product.hasMany(LineItem)
Order.hasMany(LineItem)
User.hasMany(Order)
Order.belongsTo(User)
User.hasMany(Recommendation)
Product.hasMany(Recommendation)
Recommendation.belongsTo(Product)
Recommendation.belongsTo(User)

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  LineItem,
  Order,
  Recommendation
}
