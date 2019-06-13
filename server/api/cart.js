const router = require('express').Router()
const {User, Order, LineItem, Product} = require('../db/models')

router.put('/', async (req, res, next) => {
  try {
    const {userId, productId, quantity = 1} = req.body
    if (userId) {
      if (req.user.id === userId) {
        let order = await Order.findOne({where: {userId}})
        if (!order) {
          const user = await User.findOne({where: {id: userId}})
          order = await Order.create({
            orderStatus: 'CART'
          })
          order.setUser(user)
        }
        let lineItem = await LineItem.findOne({
          where: {
            orderId: order.id,
            productId
          }
        })
        if (!lineItem) {
          const product = await Product.findOne({where: {id: productId}})
          lineItem = await LineItem.create({
            quantity,
            itemPrice: product.price
          })
          await lineItem.setOrder(order)
          await lineItem.setProduct(product)
        } else {
          lineItem.update({quantity})
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
    if (order) {
      const userCart = await LineItem.findAll({
        where: {orderId: order.id}
      })
      const parsedCart = {}
      for (let i = 0; i < userCart.length; i++) {
        const {productId, quantity} = userCart[i]

        const product = await Product.findOne({where: {id: productId}})
        const {id, name, price, imageUrl, description} = product
        parsedCart[productId] = {
          id,
          name,
          price,
          imageUrl,
          description,
          quantity
        }
      }
      res.status(200).send(parsedCart)
    } else {
      res.status(204).send()
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:uid/:pid', async (req, res, next) => {
  try {
    const userId = req.params.uid
    const productId = req.params.pid
    const order = await Order.findOne({
      where: {userId, orderStatus: 'CART'}
    })
    const userCart = await LineItem.findOne({
      where: {orderId: order.id, productId}
    })
    userCart.destroy()
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

module.exports = router
