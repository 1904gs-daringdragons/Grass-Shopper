const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const users = await User.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'email', 'firstName', 'lastName', 'isAdmin']
      })
      res.json(users)
    } else {
      res.status(403).send('Access Denied')
    }
  } catch (error) {
    res.json('ACCESS DENIED')
  }
})

router.put('/:id/userInfo', async (req, res, next) => {
  try {
    const {id} = req.params
    const {firstName, lastName, email} = req.body

    const [, updatedUser] = await User.update(
      {firstName, lastName, email},
      {
        returning: true,
        where: {id},
        individualHooks: true
      }
    )

    res.json(updatedUser[0])
  } catch (err) {
    next(err)
  }
})
