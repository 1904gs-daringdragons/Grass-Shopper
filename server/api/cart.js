const router = require('express').Router()
const {User, LineItem, Product} = require('../db/models')

router.put('/', async (req, res, next) => {
  try {
    const {userId, productId, qty = 1} = req.body
    if (userId) {
      if (req.user.id === userId) {
        const user = await User.findOne({where: {id: userId}})
        const product = await Product.findOne({where: {id: productId}})
        for (let i = 0; i < qty; i++) {
          const newLineItem = await LineItem.create({
            orderStatus: 'CART'
          })
          await newLineItem.setUser(user)
          await newLineItem.setProduct(product)
        }
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

router.put('/:pId', async (req, res, next) => {
  try {
    const {userId, qty} = req.body
    const productId = req.params.pId
    if (userId) {
      if (req.user.id === userId) {
        const user = await User.findOne({where: {id: userId}})
        const product = await Product.findOne({where: {id: productId}})
        const currentCart = await LineItem.findAll({
          where: {userId, orderStatus: 'CART'}
        })
        if (currentCart.length < qty) {
          for (let i = currentCart.length; i < qty; i++) {
            const NewItem = await LineItem.create({orderStatus: 'CART'})
            await NewItem.setUser(user)
            await NewItem.setProduct(product)
          }
        }
        if (currentCart.length > qty) {
          for (let i = qty; i < currentCart.length; i++) {
            const Kill = currentCart.pop()
            await Kill.destroy()
          }
        }
      }
      res.send()
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:uid', async (req, res, next) => {
  try {
    const userId = req.params.uid
    const userCart = await LineItem.findAll({
      where: {userId, orderStatus: 'CART'}
    })
    for (let i = 0; i < userCart.length; i++) {
      userCart[i].destroy()
      res.status(204).send()
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:uid', async (req, res, next) => {
  try {
    const userId = req.params.uid
    const userCart = await LineItem.findAll({
      where: {userId, orderStatus: 'CART'}
    })
    const parsedCart = {}
    for (let i = 0; i < userCart.length; i++) {
      const {productId} = userCart[i]
      const pid = Number(productId)
      if (parsedCart[pid]) {
        ++parsedCart[pid].quantity
      } else {
        const product = await Product.findOne({where: {id: productId}})
        const {id, name, price, imageUrl, description} = product
        parsedCart[pid] = {id, name, price, imageUrl, description, quantity: 1}
      }
    }
    res.status(200).json(parsedCart)
  } catch (error) {
    next(error)
  }
})

module.exports = router
