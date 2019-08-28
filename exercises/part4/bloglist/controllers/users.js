const bcrpyt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    if (body.username.length <= 3) {
      response.status(400).json({ error: '`username` must be longer than 3 characters' })
    } else if (body.password.length <= 3) {
      response.status(400).json({ error: '`password` must be longer than 3 characters' })
    } else {
      const saltRounds = 10
      const passwordHash = await bcrpyt.hash(body.password, saltRounds)

      const user = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash
      })
      const savedUser = await user.save()

      response.status(200).json(savedUser.toJSON())
    }
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
