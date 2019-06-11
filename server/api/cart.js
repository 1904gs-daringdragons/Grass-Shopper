const router = require('express').Router()
const {Cart, User} = require('../db/models')

router.put('/', async (req, res, next) => {
  try {
    const {userId, newCart} = req.body
    const userCart = await Cart.findByUserId(userId)
    const stringCart = JSON.stringify(newCart)
    userCart.update({products: stringCart})
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {userId} = req.body
    const newCart = await Cart.create()
    const user = await User.findById(userId)
    newCart.setUser(user)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

router.get('/:uid', async (req, res, next) => {
  try {
    const id = req.params.uid
    const userCart = await Cart.findByUserId(id)
    const parsedCart = JSON.parse(userCart.products)
    res.status(200).json(parsedCart)
  } catch (error) {
    next(error)
  }
})

module.exports = router
