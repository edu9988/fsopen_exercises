const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { tokenExtractor, userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', {
      username: 1,
      name: 1
    })

  response.json(blogs)
})

blogsRouter.post('/', tokenExtractor, userExtractor, async (request, response) => {
  const body = request.body
  if( !('likes' in body) )
    body.likes = 0

  const userId = request.user
  if(!userId)
    return response.status(401).json({error: 'token invalid'})

  const user = await User.findById(userId)
  if( !user )
    return response.status(400).send({error:'no user'})

  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', tokenExtractor, userExtractor, async (request, response) => {
  if( !request.user )
    return response.status(401).json({error: 'token invalid'})

  const blog = await Blog.findById(request.params.id)
  if( !blog )
    return response.status(404).end()

  const user = await User.findById(blog.user)

  if( request.user !== blog.user.toString() )
    return response.status(401).end()

  await Blog.findByIdAndDelete(request.params.id)
  user.blogs = user.blogs.filter( blog => blog._id.toString() !== request.params.id )
  await user.save()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body
  
  const updatedBlog = await Blog.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
    context: 'query'
  })

  if( updatedBlog )
    response.json( updatedBlog )
  else
    response.status(404).end()
})

module.exports = blogsRouter
