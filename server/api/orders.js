const router = require('express').Router()
const {Order, User} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    const {
      recipientName,
      confirmationEmail,
      price,
      address,
      city,
      state,
      zipcode,
      userId
    } = req.body
    let test = 0
    if (req.user) {
      test = req.user.id
    }
    if (userId === test) {
      const order = await Order.create({
        recipientName,
        confirmationEmail,
        price,
        address,
        city,
        state,
        zipcode
      })
      const user = await User.findOne({where: {id: userId}})
      await order.setUser(user)
      res.status(204).send()
    } else {
      rest.status(403).send('ACCESS DENIED')
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
