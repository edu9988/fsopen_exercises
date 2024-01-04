import { useState , useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')

    useEffect( () => {
	axios
	    .get('http://localhost:3001/persons')
	    .then(response => setPersons(response.data))
    }, [])

    const addPerson = (event) => {
	event.preventDefault()
	if( persons.reduce((b,p) => b || p.name === newName,
	    false)){
	    alert(`${newName} already in the phonebook`)
	}
	else{
	    const personObject = {
		name: newName,
		number: newNumber,
	    }

	    axios
		.post('http://localhost:3001/persons', personObject)
		.then(response => {
		    setPersons(persons.concat(response.data))
		})
	}
	setNewName('')
	setNewNumber('')
    }

    const handleName = (event) =>
	setNewName(event.target.value)

    const handleNumber = (event) =>
	setNewNumber(event.target.value)

    const handleSearch = (event) => {
	setSearch(event.target.value)
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

	    <Persons persons={persons} search={search} />
	</>
    )
}

export default App
