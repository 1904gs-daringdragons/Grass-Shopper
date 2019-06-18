const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    products.sort((a, b) => a.id - b.id)
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/featured', async (req, res, next) => {
  try {
    const products = await Product.findAll({where: {isFeatured: true}})
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const products = await Product.findByPk(req.params.productId)
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const {name, price, description} = req.body
      await Product.create({name, price, description})
      res.status(201).send()
    } else {
      res.status(403).send('you cant edit products dog')
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const product = await Product.findByPk(req.params.productId)
      const {name, price, imageUrl, description, isFeatured} = req.body
      await product.update({name, price, imageUrl, description, isFeatured})
      res.status(202).send()
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const product = await Product.findByPk(req.params.productId)
      await product.destroy()
      res.status(204).send()
    }
  } catch (err) {
    next(err)
  }
})
