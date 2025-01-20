const mongoose = require('mongoose')
mongoose.set('strictQuery',false)
const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then( result => {
    console.log('connected to MongoDB')
  })
  .catch( err => {
    console.log('error connecting to MongoDB:',err.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: str => {
        return /^\d?\d{2}-\d{8}\d?$/.test(str)
      },
      message: props => `${props.value} is not a valid phone number! First field is 2 or 3 digits, second field is 8 or 9 digits, they are separated by '-'. Example: 012-12345678`
    },
    required: true
  }
})
personSchema.set('toJSON',{
  versionKey:false,
  transform: (doc,ret) => {
    ret.id = ret._id.toString()
    delete ret._id
  }
})

module.exports = mongoose.model('Person', personSchema)
