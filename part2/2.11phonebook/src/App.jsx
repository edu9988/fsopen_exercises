import { useState , useEffect } from 'react'
import axios from 'axios'

const Entry = ({ person }) =>
    <li>{person.name} {person.number}</li>

const Filter = ({ val , onC }) => 
    <label>Filter contacts with
	<input value={val} onChange={onC} />
    </label>

const PersonForm = (props) => {
    const aH = props.addHandler
    const nV = props.nameVal
    const nH = props.nameHandler
    const numV = props.numberVal
    const numH = props.numberHandler

    return (
	<form onSubmit={aH}>
	    <label>Name:
		<input value={nV} onChange={nH} />
	    </label>

	    <br />

	    <label>Number:
		<input value={numV} onChange={numH} />
	    </label>

	    <br />

	    <button type="submit">add</button>
	</form>
    )
}

const Persons = ({ persons, search }) => {
    return (
	<ul>
	    {persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(p =>
		<Entry key={p.id} person={p} />
	    )}
	</ul>
    )
}

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
