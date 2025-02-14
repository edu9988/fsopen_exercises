const { test, describe, after, beforeEach } = require('node:test')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

describe('users api', () => {
  beforeEach( async () => {
    await User.deleteMany({})

/*
    const blogObjects = helper.initialBlogs
      .map( blog => new Blog(blog) )
    const promiseArray = blogObjects.map( blog => blog.save() )
    await Promise.all( promiseArray )
*/
  })

  describe('post', () => {

    test('good post returns 201', async () => {
      const newUser = {
        username: 'Alice',
        name: 'in Wonderland',
        password: '1234'
      }

      await api.post('/api/users')
        .send( newUser )
        .expect( 201 )
        .expect( 'Content-Type', /application\/json/ )

      const usersAfter = await helper.usersInDb()
      assert.strictEqual( usersAfter.length, 1 )
      const inserted = usersAfter[0]
      delete inserted.id
      delete newUser.password
      newUser.blogs = []
      assert.deepStrictEqual( inserted, newUser )
    })

    test('too short username returns 400', async () => {
      const newUser = {
        username: 'Al',
        name: 'in Wonderland',
        password: '1234'
      }

      await api.post('/api/users')
        .send( newUser )
        .expect( 400 )
        .expect( 'Content-Type', /application\/json/ )
    })

    test('duplicate username returns 400', async () => {
      let newUser = {
        username: 'Alice',
        name: 'in Wonderland',
        password: '1234'
      }

      await api.post('/api/users')
        .send( newUser )
        .expect( 201 )
        .expect( 'Content-Type', /application\/json/ )

      newUser = {
        username: 'Alice',
        name: 'The marvelous',
        password: '1234'
      }

      await api.post('/api/users')
        .send( newUser )
        .expect( 400 )
        .expect( 'Content-Type', /application\/json/ )
    })

    test('missing username returns 400', async () => {
      const newUser = {
        name: 'Elon Musk',
        password: '1234'
      }

      await api.post('/api/users')
        .send( newUser )
        .expect( 400 )
        .expect( 'Content-Type', /application\/json/ )
    })

    test('too short password returns 400', async () => {
      const newUser = {
        username: 'Bob',
        name: 'Burnquist',
        password: '12'
      }

      await api.post('/api/users')
        .send( newUser )
        .expect( 400 )
        .expect( 'Content-Type', /application\/json/ )
    })

    test('missing password returns 400', async () => {
      const newUser = {
        username: 'Bob',
        name: 'Burnquist'
      }

      await api.post('/api/users')
        .send( newUser )
        .expect( 400 )
        .expect( 'Content-Type', /application\/json/ )
    })

/*
    test('"likes" defaults to 0', async () => {
      const newBlog = {
        author: 'Bob',
        title: 'Barbecue',
        url: 'about: blank'
      }

      await api.post('/api/blogs')
        .send( newBlog )
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
        .expect( 400 )
    })

    test('post object missing url returns 400', async () => {
      const newBlog = {
        author: 'Bob',
        title: 'Barbecue'
      }

      await api.post('/api/blogs')
        .send( newBlog )
        .expect( 400 )
    })
    */

  })

/*
  describe('delete', () => {

    test('returns 204 if id is valid', async () => {
      const blogsBefore = await api.get('/api/blogs')
      const singleBlog = blogsBefore.body[0]
      
      await api.delete(`/api/blogs/${singleBlog.id}`)
        .expect(204)

      const blogsAfter = await api.get('/api/blogs')
      
      assert(!blogsAfter.body.includes(singleBlog))
    })

    test('returns 404 if id not found', async () => {
      const validNonexistingId = await helper.nonExistingId()
      
      await api
        .delete(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })
  })

  describe('put', () => {
    test('valid id and body returns 200', async () => {
      const blogsBefore = await api.get('/api/blogs')
      const singleBlog = blogsBefore.body[0]
      singleBlog.likes += 1

      await api
        .put(`/api/blogs/${singleBlog.id}`)
        .send(singleBlog)
        .expect(200)

      const blogsAfter = await api.get('/api/blogs')
      const alteredBlog = blogsAfter.body[0]

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
*/

})

after(async () => {
  await mongoose.connection.close()
})
