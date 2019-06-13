const router = require('express').Router()
const {User, LineItem, Product} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    const {
      recipientName,
      confirmationEmail,
      address,
      city,
      state,
      zipcode,
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
      for (let product in cart) {
        const curProduct = await Product.findOne({
          where: {
            id: cart[product].id
          }
        })
        const itemPrice = curProduct.price
        const lineItem = await LineItem.create({
          recipientName,
          confirmationEmail,
          itemPrice,
          address,
          city,
          state,
          zipcode,
          confirmationNumber
        })
        await lineItem.setUser(user)
        await lineItem.setProduct(curProduct)
      }

      res.status(204).send()
    } else {
      res.status(403).send('ACCESS DENIED')
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
