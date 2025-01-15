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
    content: String,
    important: String
})
personSchema.set('toJSON',{
    versionKey:false,
    transform: (doc,ret) => {
        ret.id = ret._id.toString()
        delete ret._id
    }
})

module.exports = mongoose.model('Person', personSchema)
