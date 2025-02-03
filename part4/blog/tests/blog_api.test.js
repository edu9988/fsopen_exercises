const { test, describe, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

describe('api', () => {
  beforeEach( async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map( blog => new Blog(blog) )
    const promiseArray = blogObjects.map( blog => blog.save() )
    await Promise.all( promiseArray )
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are six blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach( blog => {
      assert('id' in blog && !('_id' in blog))
    })
  })

  test('post works', async () => {
    const newBlog = {
      author: 'Alice',
      title: 'in Wonderland',
      url: 'about: blank',
      likes: 0
    }

    await api.post('/api/blogs')
      .send( newBlog )
      .expect( 201 )
      .expect( 'Content-Type', /application\/json/ )

    const blogsAfter = await helper.blogsInDb()
    assert.strictEqual( blogsAfter.length, helper.initialBlogs.length + 1 )
    const inserted = blogsAfter[blogsAfter.length-1]
    delete inserted.id
    assert.deepStrictEqual( inserted, newBlog )
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
