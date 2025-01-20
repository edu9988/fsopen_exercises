require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./model/person')

morgan.token('body', (req,res) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

app.get('/info', (request,response) => {
    Person.find({})
        .then( persons => {
            const count = persons.length
            response.send(`<!doctype html>
                <p>Phonebook has info for ${count} people</p>
                <p>${Date()}</p>`
            )
        })
        .catch( error => {
            console.error('find error:',error.message)
            response.send(`<!doctype html>
                <p>Fetching Phonebook info failed</p>
                <p>${Date()}</p>`
            )
        })

})

app.get('/api/persons', (request, response) => {
    Person.find({})
        .then( p => response.json(p) )
        .catch( error => next(error) )
})

app.get('/api/persons/:id', (request,response,next) => {
    Person.findById(request.params.id)
        .then( answer => {
            if( answer )
                response.json( answer )
            else
                response.status(404).end()
        })
        .catch( error => next(error) )
})

app.delete('/api/persons/:id', (request,response,next) => {
    const id = request.params.id
    Person.findByIdAndDelete( id )
        .then( result => {
            if( result )
                response.status(204).end()
            else
                response.status(404).end()
        })
        .catch( error => next(error) )
})

app.post('/api/persons', (request,response,next) => {
/* can't use this for now
    if( persons.some(p => p.name === request.body.name ) )
        return response.status(400).json({
            error: `name must be unique, '${request.body.name}' already taken`
	})
*/
    const person = new Person({
        name: request.body.name,
        number: request.body.number
    })

    person.save()
        .then( savedPerson => {
            response.json( savedPerson )
        })
        .catch( error => next(error) )
})

app.put('/api/persons/:id',(request,response,next) => {
    const id = request.params.id
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(id,person,{
        new:true,
        runValidators: true,
        context: 'query'
    })
        .then( updatedPerson => {
            response.json( updatedPerson )
        })
        .catch( error => next(error) )
})

const errorHandler = (error,request,response,next) => {
    console.error( error.message )

    if( error.name === 'CastError' )
        return response.status(400).send(
            {error:'malformatted id'}
        )
    else if( error.name === 'ValidationError' ){
        console.error(error)
        return response.status(400).json(
            {error:error.message}
        )
    }

    next(error)
}

app.use( errorHandler )

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
