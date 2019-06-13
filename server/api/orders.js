const router = require('express').Router()
const {User, Order, LineItem, Product} = require('../db/models')

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
    let test = 0
    if (req.user) {
      test = req.user.id
    }
    if (userId === test) {
      const confirmationNumber = (Date.now() * zipcode) % 1000000000
      const user = await User.findOne({where: {id: userId}})
      const newOrder = await Order.create({
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
      })
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
      await newOrder.setUser(user)
      res.status(204).send()
    } else {
      res.status(403).send('ACCESS DENIED')
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
