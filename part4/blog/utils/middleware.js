const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }
  else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({error: error.message})
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if( authorization && authorization.startsWith('Bearer ') )
    request.token = authorization.replace('Bearer ', '')
  else
    request.token = null

  next()
}

const userExtractor = (request, response, next) => {
  const token = request.token
  if( token === null )
    return response.status(401).end()

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if( !decodedToken.id )
    request.user = null
  else
    request.user = decodedToken.id

  next()
}

const requestLogger = (request, response, next) => {
  console.log(`\n${new Date()}`,
    'Method:', request.method,
    'Path:  ', request.path,
    'Headers:  ', request.headers,
    'Body:  ', request.body,
    '\n'
  )
  next()
}

module.exports ={
  errorHandler,
  tokenExtractor,
  userExtractor,
  requestLogger
}
