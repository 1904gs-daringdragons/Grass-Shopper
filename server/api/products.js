const router = require('express').Router()
const {Product, Recommendation} = require('../db/models')
const db = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const userId = req.query.userId ? req.query.userId : 0
    const [products] = await db.query(
      String.raw`
      SELECT avg.id, avg.name, avg.price, avg."imageUrl", avg.description, avg.quantity, avg."isFeatured", avg."featuredUrl", avg."createdAt", avg."updatedAt",
      CAST(case when singleUser."userId" is null then avg.avg else singleUser.stars end AS INT) as stars
    FROM
      (
        SELECT P.*, AVG(R.stars)
FROM PRODUCTS P
LEFT JOIN RECOMMENDATIONS R
ON P.id = R."productId"
GROUP BY P.id, P.price, P."imageUrl", P.description, P.quantity, P."isFeatured", P."featuredUrl"
      ) avg
    LEFT JOIN
      (
        SELECT "productId" As pId, "userId", stars
FROM RECOMMENDATIONS
WHERE "userId" = ${userId}
      ) singleUser
    ON singleUser.pId = avg.id`
    )
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
    const userId = req.query.userId ? req.query.userId : 0
    const productObj = await db.query(
      String.raw`
      SELECT avg.id, avg.name, avg.price, avg."imageUrl", avg.description, avg.quantity, avg."isFeatured", avg."featuredUrl",
      avg."createdAt", avg."updatedAt",
      CAST(case when singleUser."userId" is null then avg.avg else singleUser.stars end AS INT) as stars
      FROM
      (
      SELECT P.*, AVG(R.stars)
      FROM PRODUCTS P
      LEFT JOIN RECOMMENDATIONS R
      ON P.id = R."productId"
      WHERE P.id = ${req.params.productId}
      GROUP BY P.id, P.price, P."imageUrl", P.description, P.quantity, P."isFeatured", P."featuredUrl"
      ) avg
      LEFT JOIN
      (
      SELECT "productId" As pId, "userId", stars
      FROM RECOMMENDATIONS
      WHERE "userId" = ${userId}
      ) singleUser
      ON singleUser.pId = avg.id`
    )
    const products = productObj[0][0]
    console.log(products)
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

router.put('/rec/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId
    const {uId, stars} = req.body

    if (req.user.id === uId) {
      const [userRec, created] = await Recommendation.findOrCreate({
        where: {
          userId: uId,
          productId
        },
        defaults: {stars}
      })
      if (created) {
        await userRec.setUser(uId)
        await userRec.setProduct(productId)
      } else await userRec.update({stars})
    }
    res.status(201).send()
  } catch (error) {
    next(error)
  }
})
