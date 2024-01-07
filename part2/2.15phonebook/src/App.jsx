import { useState , useEffect } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import personService from './services/person.js'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')

    useEffect( () => {
	personService
	    .getAll()
	    .then(data => setPersons(data))
    }, [])

    const addPerson = (event) => {
	event.preventDefault()
	const oldUser = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())

	if( oldUser !== undefined ){ /* existing user */
	    if( window.confirm(`${newName} already in the phonebook, replace old number with ${newNumber}?`) ) {
		const updatedUser = {
		    name: newName,
		    number: newNumber
		}

		personService
		    .update(oldUser.id, updatedUser)
		    .then(data =>
			setPersons(persons.map(p =>
			    p.id === oldUser.id ? data : p
			))
		    )
		setNewName('')
		setNewNumber('')
	    }
	    else {
		console.log(`Updating number denied by user`)
	    }
	}

	else{ /* new user */
	    const personObject = {
		name: newName,
		number: newNumber,
	    }

	    personService
		.save(personObject)
		.then(data => {
		    setPersons(persons.concat(data))
		})
	    setNewName('')
	    setNewNumber('')
	}
    }

    const handleName = (event) =>
	setNewName(event.target.value)

    const handleNumber = (event) =>
	setNewNumber(event.target.value)

    const handleSearch = (event) => {
	setSearch(event.target.value)
    }

    const handleDel = (id) => {
	if( window.confirm(
	    `Delete ${persons.find(p => p.id === id).name}?`
	) ){
	    personService
		.remove(id)
		.then(() =>
		    setPersons(persons.filter(p => p.id !== id))
		)
	}
    }

    return (
	<>
	    <h2>Phonebook</h2>

	    <Filter val={search} onC={handleSearch} />

	    <h3>add new</h3>
	    
	    <PersonForm
		addHandler={addPerson}
		nameVal={newName}
		nameHandler={handleName}
		numberVal={newNumber}
		numberHandler={handleNumber}
	    />

	    <h3>Numbers</h3>

	    <Persons 
		persons={persons}
		search={search}
		hDel={handleDel}
	    />
	</>
    )
}

export default App
