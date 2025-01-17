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

app.get('/info', (req,res) => {
    const count = persons.reduce( (s,p) => s+1 , 0 )
    res.send(`<!doctype html>
	<p>Phonebook has info for ${count} people</p>
	<p>${Date()}</p>`
    )
})

app.get('/api/persons', (req, res) => {
    Person.find({})
        .then( p => res.json(p) )
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

app.post('/api/persons', (req, res) => {
    if( !req.body.name && req.body.number )
        return res.status(400).json({
            error: 'name missing'
        })

    if( !req.body.number && req.body.name )
        return res.status(400).json({
            error: 'number missing'
        })

    if( !req.body.number && !req.body.name )
        return res.status(400).json({
            error: 'name and number missing'
        })

/* can't use this for now
    if( persons.some(p => p.name === req.body.name ) )
        return res.status(400).json({
            error: `name must be unique, '${req.body.name}' already taken`
	})
*/

    const person = new Person({
        name: req.body.name,
        number: req.body.number
    })

    person.save()
        .then( savedPerson => {
            res.json( savedPerson )
        })
})

app.put('/api/persons/:id',(request,response,next) => {
    const id = request.params.id
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(id,person,{new:true})
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

    next(error)
}

app.use( errorHandler )

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
