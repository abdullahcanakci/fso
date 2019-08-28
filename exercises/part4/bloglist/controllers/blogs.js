const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

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
  const body = request.body
  const token = request.token

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  const token = request.token
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(id)
    if (blog.user.toString() !== decodedToken.id.toString()) {
      return response.status(403).json({ error: 'unauthorized operation.' })
    }

    blog.delete()
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
