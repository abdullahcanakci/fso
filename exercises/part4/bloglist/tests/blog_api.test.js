const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const dummyData = require('./dummy_data')

const api = supertest(app)

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
  const newBlog = new Blog(dummyData.newBlog)

  await api
    .post('/api/blogs')
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
  const newBlog = dummyData.newBlog
  delete newBlog.likes
  const blogObject = new Blog(newBlog)
  const response = await api
    .post('/api/blogs')
    .send(blogObject)

  expect(response.body.likes).toBe(0)
})

// 4.12
test('invalid blog request', async () => {
  const newBlog = dummyData.newBlog
  delete newBlog.title
  delete newBlog.url
  await api
    .post('/api/blogs')
    .send(new Blog(newBlog))
    .expect(400)
})

test('delete blog', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  const id = blogs[0].id
  const expectedTitle = blogs[0].title
  await api
    .delete(`/api/blogs/${id}`)
    .send()
    .expect(204)

  const newResponse = await api.get('/api/blogs')
  const newBlogs = newResponse.body
  const titles = newBlogs.filter(blog => blog.title)
  expect(titles).not.toContain(expectedTitle)
})

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

// TODO make refactor this to be flexible
beforeEach(async () => {
  await Blog.deleteMany({})
  for (const blog of dummyData.blogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

afterAll(() => {
  mongoose.connection.close()
})
