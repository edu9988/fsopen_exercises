const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', {
      username: 1,
      name: 1
    })

  response.json(blogs)
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if( authorization && authorization.startsWith('Bearer ') )
    return authorization.replace('Bearer ', '')
  return null
}

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if( !('likes' in body) )
    body.likes = 0

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if(!decodedToken.id)
    return response.status(401).json({error: 'token invalid'})

  const user = await User.findById(decodedToken.id)
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

blogsRouter.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndDelete(request.params.id)
  if( result )
    response.status(204).end()
  else
    response.status(404).end()
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
