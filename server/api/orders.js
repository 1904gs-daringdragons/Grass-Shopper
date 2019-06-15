const router = require('express').Router()
const {User, Order, LineItem, Product} = require('../db/models')

const generateLineItems = async (newOrder, cart) => {
  let totalPrice = 0
  for (let product in cart) {
    if (cart[product].id) {
      console.log(cart[product])

      const curProduct = await Product.findOne({
        where: {
          id: product
        }
      })
      const quantity = cart[product].quantity
      const itemPrice = curProduct.price

      totalPrice += itemPrice * quantity
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
      const confirmationNumber = (Date.now() * billingZipcode) % 1000000000
      const user = await User.findOne({where: {id: userId}})
      const newOrder = await Order.create({
        ...shippingAndBilling
      })

      await generateLineItems(newOrder, cart)

      await newOrder.setUser(user)
      res.status(204).send()
    }
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const orders = await LineItem.findAll()
      res.json(orders)
    } else {
      res.status(403).send('Access Denied')
    }
  } catch (error) {
    res.json('ACCESS DENIED')
  }
})

module.exports = router
