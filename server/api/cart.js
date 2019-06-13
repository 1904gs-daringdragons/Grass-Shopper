const router = require('express').Router()
const {Order, LineItem, Product} = require('../db/models')

router.put('/', async (req, res, next) => {
  try {
    const {userId, productId, qty = 1} = req.body
    if (userId) {
      if (req.user.id === userId) {
        const order = await Order.findOne({where: {userId}})
        const product = await Product.findOne({where: {id: productId}})
        const newLineItem = await LineItem.create({
          quantity: qty,
          itemPrice: product.price
        })
        await newLineItem.setOrder(order)
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

router.put('/:pId', async (req, res, next) => {
  try {
    const {userId, qty} = req.body
    const productId = req.params.pId
    if (userId) {
      if (req.user.id === userId) {
        const currentCart = await Order.findOne({
          where: {userId, orderStatus: 'CART'}
        })
        const currLineItem = await LineItem.findOne({
          where: {
            orderId: currentCart.id,
            productId
          }
        })
        currLineItem.update({quantity: qty})
      }
      res.send()
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:uid', async (req, res, next) => {
  try {
    const userId = req.params.uid
    const order = await Order.findOne({
      where: {userId, orderStatus: 'CART'}
    })
    for (let i = 0; i < userCart.length; i++) {
      userCart[i].destroy()
    }
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

router.delete('/:uid/:pid', async (req, res, next) => {
  try {
    const userId = req.params.uid
    const productId = req.params.pid
    const userCart = await LineItem.findAll({
      where: {userId, orderStatus: 'CART', productId}
    })
    for (let i = 0; i < userCart.length; i++) {
      userCart[i].destroy()
    }
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

router.get('/:uid', async (req, res, next) => {
  try {
    const userId = req.params.uid
    const userCart = await LineItem.findAll({
      where: {order: order.id}
    })
    const parsedCart = {}
    for (let i = 0; i < userCart.length; i++) {
      const {productId, quantity} = userCart[i]
      const pid = Number(productId)

      const product = await Product.findOne({where: {id: productId}})
      parsedCart[pid] = {...product, quantity}
    }
    res.status(200).json(parsedCart)
  } catch (error) {
    next(error)
  }
})

module.exports = router
