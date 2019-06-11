const express = require('express')
const router = express.Router()
const {Order} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    const {
      recipientName,
      conformationEmail,
      price,
      address,
      city,
      state,
      zipcode
    } = req.body
    console.log(req.body)
    await Order.create({
      recipientName,
      conformationEmail,
      price,
      address,
      city,
      state,
      zipcode
    })
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

module.exports = router
