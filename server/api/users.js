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

    const [, editedUser] = await User.update(
      {firstName, lastName, email},
      {
        returning: true,
        where: {id},
        individualHooks: true
      }
    )

    res.json(editedUser[0])
  } catch (error) {
    next(error)
  }
})

router.put('/:id/userInfo/passchg', async (req, res, next) => {
  try {
    // Take the id from the request parameters and
    // the old/new passwords from the body, then
    // find the user in the db that matches that id
    const {id} = req.params
    const {formerPassword, newPassword} = req.body
    const user = await User.findOne({where: {id: id}})

    // Use the correctPassword User model class method to check
    // that the user has input the correct current password
    if (user.correctPassword(formerPassword)) {
      // Then update the user's password and
      // return the user
      const editedUser = await User.update(
        {
          password: newPassword
        },
        {
          returning: true,
          where: {id},
          individualHooks: true
        }
      )
      res.json(editedUser[1][0])
    } else {
      res.status(401).send('not authenticated')
    }
  } catch (error) {
    next(error)
  }
})
