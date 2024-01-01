import { useState } from 'react'

const Entry = ({ person }) =>
    <li>{person.name} {person.number}</li>

const App = () => {
    const [persons, setPersons] = useState([
	{
	    name: 'Arto Hellas',
	    number: '040-1234567',
	    id: 1
	}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')

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
		id: persons.length+1
	    }

	    setPersons(persons.concat(personObject))
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
	    <label>filter contacts with
		<input value={search} onChange={handleSearch} />
	    </label>

	    <h2>add new</h2>
	    <form onSubmit={addPerson}>
		<label>Name:
		    <input value={newName} onChange={handleName} />
		</label>
		<br />
		<label>Number:
		    <input value={newNumber} onChange={handleNumber} />
		</label>
		<br />
		<button type="submit">add</button>
	    </form>

	    <h2>Numbers</h2>
	    <ul>
		{persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(p =>
		    <Entry key={p.id} person={p} />
		)}
	    </ul>
	</>
    )
}

export default App
