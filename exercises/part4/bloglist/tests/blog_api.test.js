const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const dummyData = require('./dummy_data')

const api = supertest(app)

const getToken = async (username, password) => {
  const response = await api
    .post('/api/login')
    .send({ username: 'root', password: 'password' })

  return response.body.token
}

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test(' a spesific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(blog => blog.title)

  expect(titles).toContain(dummyData.expectedValues.expectedTitle)
})

// 4.8
test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(dummyData.blogs.length)
})

// 4.9
test('id field is avaible', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

// 4.10
test('a valid post can be added', async () => {
  const token = await getToken('root', 'password')

  const newBlog = {
    title: 'New Entry Title',
    author: 'New entry author',
    url: 'new url',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .set({ Authorization: `bearer ${token}` })
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(blog => blog.title)
  expect(response.body.length).toBe(dummyData.blogs.length + 1)
  expect(titles).toContain(dummyData.newBlog.title)
})

// 4.11
test('likes defaults to 0', async () => {
  const users = await User.find({})
  const userId = users[0]._id.toString()

  const token = await getToken('root', 'password')

  const newBlog = {
    title: 'New Entry Title',
    author: 'New entry author',
    url: 'new url',
    likes: 0,
    userId: userId
  }

  const response = await api
    .post('/api/blogs')
    .set({ Authorization: `bearer ${token}` })
    .send(newBlog)

  expect(response.body.likes).toBe(0)
})

// 4.12
test('invalid blog request', async () => {
  const users = await User.find({})
  const userId = users[0]._id.toString()

  const token = await getToken('root', 'password')

  const newBlog = {
    url: 'new url',
    likes: 0,
    userId: userId
  }

  await api
    .post('/api/blogs')
    .set({ Authorization: `bearer ${token}`})
    .send(newBlog)
    .expect(400)
})

// 4.13
test('delete blog', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  const id = blogs[0].id
  const expectedTitle = blogs[0].title

  const token = await getToken('root', 'password')

  await api
    .delete(`/api/blogs/${id}`)
    .set({ Authorization: `bearer ${token}` })
    .send()
    .expect(204)

  const newResponse = await api.get('/api/blogs')
  const newBlogs = newResponse.body
  const titles = newBlogs.filter(blog => blog.title)
  expect(titles).not.toContain(expectedTitle)
})

// 4.14
test('update blogs', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]
  const id = blog.id
  blog.likes = 1001
  await api
    .put(`/api/blogs/${id}`)
    .send(blog)

  const newResponse = await api.get(`/api/blogs/${id}`)
  expect(newResponse.body.likes).toBe(1001)
})

test('blog entries should have `user` field', async () => {
  const blogs = await Blog.find({})
  const blog = blogs[0]
  const users = await User.find({})
  expect(blog.user).toBeDefined()
  expect(blog.user._id.toString()).toBe(users[0]._id.toString())
})

// TODO make refactor this to be flexible
beforeEach(async () => {
  await User.deleteMany({})
  let user = { username: 'root', password: 'password' }
  const response = await api
    .post('/api/users')
    .send(user)
  user = response.body

  await Blog.deleteMany({})
  for (const blog of dummyData.blogs) {
    const blogObject = new Blog(blog)
    blogObject.user = user.id
    await blogObject.save()
  }
})

afterAll(() => {
  mongoose.connection.close()
})
