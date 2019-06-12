const router = require('express').Router()
const {User, LineItem, Product} = require('../db/models')

router.put('/', async (req, res, next) => {
  console.log(req.body)
  try {
    const {userId, productId} = req.body
    if (userId) {
      if (req.user.id === userId) {
        // const userCart = await Cart.findOne({where: {userId}})
        // const stringCart = JSON.stringify(newCart)
        // console.log(userCart)
        // await userCart.update({products: stringCart})
        // res.status(204).send()
        const user = await User.findOne({where: {id: userId}})
        const product = await Product.findOne({where: {id: productId}})
        const newLineItem = await LineItem.create({
          orderStatus: 'CART'
        })
        await newLineItem.setUser(user)
        await newLineItem.setProduct(product)
        res.status(204).send()
      } else {
        res.status(403).send('ACCESS DENIED')
      }
    } else {
      res.status(200).send()
    }
  } catch (error) {
    next(error)
  }
})

// router.post('/', async (req, res, next) => {
//   try {
//     const {userId} = req.body
//     const newCart = await Cart.create()
//     const user = await User.findOne({where: {id: userId}})
//     await newCart.setUser(user)
//     res.status(204).send()
//   } catch (error) {
//     next(error)
//   }
// })

router.get('/:uid', async (req, res, next) => {
  try {
    const userId = req.params.uid
    const userCart = await LineItem.findAll({
      where: {userId, orderStatus: 'CART'}
    })
    const parsedCart = userCart.reduce((cart, item) => {
      cart[item.id] = item
      return cart
    }, {})
    res.status(200).json(parsedCart)
  } catch (error) {
    next(error)
  }
})

module.exports = router
