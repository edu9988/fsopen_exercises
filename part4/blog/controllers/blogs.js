const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', {
      username: 1,
      name: 1
    })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if( !('likes' in body) )
    body.likes = 0

  const user = await User.findOne().exec()
  if( !user )
    return response.status(404).send({error:'no user'})
  console.log('user._id:',user._id)

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
