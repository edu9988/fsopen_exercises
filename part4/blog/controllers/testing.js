const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  //await User.deleteMany({})
  //I see no point in deleting and creating
  //the same user over and over again
  //during tests. The tests do not alter
  //user collection

  response.status(204).end()
})

module.exports = router
