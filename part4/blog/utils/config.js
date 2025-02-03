require('dotenv').config()

console.log( process.env.NODE_ENV === 'test'
  ? '---  NODE_ENV=test  ---'
  : process.env.NODE_ENV === 'development'
    ? '---  NODE_ENV=development  ---'
    : '---  NODE_ENV=production  ---'
)

const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}
