const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)

const getToken = async (username, password) => {
  const response = await api
    .post('/api/login')
    .send({ username: 'root', password: 'password' })

  return response.body.token
}

describe('When there is 1 initial user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = { username: 'root', password: 'password' }
    await api
      .post('/api/users')
      .send(user)
  })

  test('can access user at db', async () => {
    const initialUsers = await User.find({})
    expect(initialUsers.length).toBe(1)
  })

  test('User password has is not accessible', async () => {
    const response = await api
      .get('/api/users')
      .send()
    const initialUsers = response.body
    expect(initialUsers[0].passwordHash).not.toBeDefined()
  })

  test('creation succesful with new name', async () => {
    const initialUsers = await User.find({})

    const newUser = {
      username: 'newUser',
      name: 'User Name',
      password: 'userpassword'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const finalUsers = await User.find({})
    expect(finalUsers.length).toBe(initialUsers.length + 1)

    const usernames = finalUsers.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails, with duplicate name', async () => {
    const initialUsers = await User.find({})
    const newUser = {
      username: initialUsers[0].username,
      name: 'clone user',
      password: 'doesntmatter'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('`username` to be unique')
    const finalUsers = await User.find({})
    expect(finalUsers.length).toBe(initialUsers.length)
  })

  test('blog attaching to user is successfull', async () => {
    const token = await getToken('root', 'password')

    const newBlog = {
      title: 'New Entry Title',
      author: 'New entry author',
      url: 'new url',
      likes: 10
    }

    const response = await api
      .post('/api/blogs')
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const finalUsers = await User.find({})
    expect(finalUsers[0].blogs).toBeDefined()
    const blogs = finalUsers[0].blogs
    expect(blogs.length).toBe(1)
    expect(blogs[0].toString()).toEqual(response.body.id)
  })
})

describe('Invalid user creation', () => {
  test('Short username fails', async () => {
    const newUser = {
      username: 'ab',
      name: 'user name',
      password: 'validpassword'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('`username` must be longer than 3 characters')
  })

  test('Short password fails', async () => {
    const newUser = {
      username: 'validname',
      name: 'user name',
      password: 'ab'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('`password` must be longer than 3 characters')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
