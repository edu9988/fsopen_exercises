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

let persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]

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

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then( r => res.json(r) )
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    if( persons.some(p => p.id === id) ){
	persons = persons.filter(p => p.id !== id)
	res.status(204).end()
    }
    else
	res.status(404).end()
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

    if( persons.some(p => p.name === req.body.name ) )
	return res.status(400).json({
	    error: `name must be unique, '${req.body.name}' already taken`
	})

    let newId = Math.floor( Math.random()*1000 )
    while( persons.some( p => p.id === newId ) )
        newId++

    const person = {
	id: newId,
	name: req.body.name,
	number: req.body.number
    }

    persons = persons.concat(person)
    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
