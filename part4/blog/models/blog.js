const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  author: String,
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON',{
  versionKey: false,
  transform: (document,returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

module.exports = mongoose.model('Blog', blogSchema)
