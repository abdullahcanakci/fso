const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
  } catch (error) {
    next(error)
  }
})

blogsRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id
  if (id) {
    try {
      const blog = await Blog.findById(id)
      response.json(blog.toJSON())
    } catch (error) {
      next(error)
    }
  } else {
    response.status(400)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog.toJSON())
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  try {
    await Blog.findOneAndDelete(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const blog = request.body

  if (id) {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
      response.json(updatedBlog.toJSON())
    } catch (error) {
      next(error)
    }
  } else {
    response.status(400)
  }
})

module.exports = blogsRouter
