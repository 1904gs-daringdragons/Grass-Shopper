const router = require('express').Router()
const {User, Order, LineItem, Product} = require('../db/models')

const generateLineItems = async (newOrder, cart) => {
  let totalPrice = 0
  for (let product in cart) {
    if (product.id) {
      const curProduct = await Product.findOne({
        where: {
          id: cart[product].id
        }
      })
      totalPrice += curProduct.price
      const itemPrice = curProduct.price
      const quantity = curProduct.quantity
      const lineItem = await LineItem.create({
        quantity,
        itemPrice
      })
      await lineItem.setOrder(newOrder)
      await lineItem.setProduct(curProduct)
    }
  }
  await newOrder.update({totalPrice})
}

router.post('/', async (req, res, next) => {
  try {
    const {
      recipientName,
      confirmationEmail,
      billingAddress,
      shippingAddress,
      billingCity,
      shippingCity,
      billingState,
      shippingState,
      billingZipcode,
      shippingZipcode,
      userId,
      cart
    } = req.body
    const shippingAndBilling = {
      recipientName,
      confirmationEmail,
      billingAddress,
      shippingAddress,
      billingCity,
      shippingCity,
      billingState,
      shippingState,
      billingZipcode,
      shippingZipcode
    }
    if (req.user) {
      if (userId === req.user.id) {
        const newOrder = await Order.findOne({
          where: {
            userId,
            orderStatus: 'CART'
          }
        })
        await newOrder.update({
          orderStatus: 'CREATED',
          ...shippingAndBilling
        })
        res.status(204).send()
      } else {
        res.status(403).send('ACCESS DENIED')
      }
    } else if (userId === 0) {
      const newOrder = await Order.create({
        ...shippingAndBilling
      })

      await generateLineItems(newOrder, cart)

      res.status(204).send()
    }
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const orders = await Order.findAll()
      res.json(orders)
    } else {
      res.status(403).send('Access Denied')
    }
  } catch (error) {
    res.json('ACCESS DENIED')
  }
})

module.exports = router
