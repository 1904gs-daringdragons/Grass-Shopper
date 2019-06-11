const router = require('express').Router()
const {Order, User} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    const {
      recipientName,
      conformationEmail,
      price,
      address,
      city,
      state,
      zipcode,
      userId
    } = req.body
    const order = await Order.create({
      recipientName,
      conformationEmail,
      price,
      address,
      city,
      state,
      zipcode
    })
    const user = await User.findOne({where: {id: userId}})
    await order.setUser(user)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

module.exports = router
