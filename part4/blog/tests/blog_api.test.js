const { before, test, describe, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)
let userId, token

before( async () => {
  const userResponse = await api
    .get('/api/users')
  if( !userResponse.body
    .some( u => u.username === 'Alice' )
  ){
    const result = await api
      .post('/api/users')
      .send( {
        username: 'Alice',
        password: '1234'
      })
    userId = result.body.id
  }
  else
    userId = userResponse.body
      .find( u => u.username === 'Alice' ).id

  const loginResult = await api
    .post('/api/login')
    .send( {
      username: 'Alice',
      password: '1234'
    })

  token = loginResult.body.token
})

describe('blogs api', () => {
  beforeEach( async () => {
    await Blog.deleteMany({})

    let blogObjects = helper.initialBlogs
    blogObjects
      .forEach( blog => blog.user = userId )
    blogObjects = blogObjects
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

  describe('post', () => {

    test('post works', async () => {
      const newBlog = {
        author: 'Alice',
        title: 'in Wonderland',
        url: 'about: blank',
        likes: 0
      }

      const r = await api.post('/api/blogs')
        .send( newBlog )
        .set('Authorization', `Bearer ${token}`)
        .expect( 201 )
        .expect( 'Content-Type', /application\/json/ )
      
      const blogsAfter = await helper.blogsInDb()
      assert.strictEqual( blogsAfter.length, helper.initialBlogs.length + 1 )
      const inserted = blogsAfter[blogsAfter.length-1]

      assert.strictEqual( inserted.user.toString(), userId )
      delete inserted.id
      delete inserted.user
      assert.deepStrictEqual( inserted, newBlog )
    })

    test('"likes" defaults to 0', async () => {
      const newBlog = {
        author: 'Bob',
        title: 'Barbecue',
        url: 'about: blank'
      }

      await api.post('/api/blogs')
        .send( newBlog )
        .set('Authorization', `Bearer ${token}`)
        .expect( 201 )
        .expect( 'Content-Type', /application\/json/ )

      const blogsAfter = await helper.blogsInDb()
      assert.strictEqual( blogsAfter[blogsAfter.length-1].likes, 0 )
    })

    test('post object missing title returns 400', async () => {
      const newBlog = {
        author: 'Bob',
        url: 'about: blank'
      }

      await api.post('/api/blogs')
        .send( newBlog )
        .set('Authorization', `Bearer ${token}`)
        .expect( 400 )
    })

    test('missing token returns 401', async () => {
      const newBlog = {
        author: 'Bob',
        title: 'Barbecue',
        url: 'about: blank',
        likes: 0
      }

      await api.post('/api/blogs')
        .send( newBlog )
        .expect( 401 )
    })

    test('post object missing url returns 400', async () => {
      const newBlog = {
        author: 'Bob',
        title: 'Barbecue'
      }

      await api.post('/api/blogs')
        .send( newBlog )
        .set('Authorization', `Bearer ${token}`)
        .expect( 400 )
    })

  })

  describe('delete', () => {
    test('returns 204 if id and token are valid', async () => {
      const blogsBefore = await api.get('/api/blogs')
      const singleBlog = blogsBefore.body[blogsBefore.body.length-1]
      
      await api.delete(`/api/blogs/${singleBlog.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAfter = await api.get('/api/blogs')
      
      assert(!blogsAfter.body.includes(singleBlog))
    })

    test('returns 404 if id not found', async () => {
      const validNonexistingId = await helper.nonExistingId()
      
      await api
        .delete(`/api/blogs/${validNonexistingId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
    })

    test('deleting without token returns 401', async () => {
      const blogsBefore = await api.get('/api/blogs')
      const singleBlog = blogsBefore.body[blogsBefore.body.length-1]
      
      await api.delete(`/api/blogs/${singleBlog.id}`)
        .expect(401)
    })
  })

  describe('put', () => {
    test('valid id and body returns 200', async () => {
      const blogsBefore = await api.get('/api/blogs')
      const singleBlog = blogsBefore.body[0]
      singleBlog.likes += 1
      delete singleBlog.user

      await api
        .put(`/api/blogs/${singleBlog.id}`)
        .send(singleBlog)
        .expect(200)

      const blogsAfter = await api.get('/api/blogs')
      const alteredBlog = blogsAfter.body[0]
      delete alteredBlog.user

      assert.deepStrictEqual( singleBlog, alteredBlog )
    })

    test('returns 404 if id not found', async () => {
      const validBlog = helper.initialBlogs[0]
      const validNonexistingId = await helper.nonExistingId()
      
      await api
        .put(`/api/blogs/${validNonexistingId}`)
        .send(validBlog)
        .expect(404)
    })

  })

})

after(async () => {
  await mongoose.connection.close()
})
