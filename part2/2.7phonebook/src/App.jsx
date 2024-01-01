import { useState } from 'react'

const Entry = ({ person }) => <li>{person.name}</li>

const App = () => {
    const [persons, setPersons] = useState([
	{ name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const addPerson = (event) => {
	event.preventDefault()
	if( persons.reduce((b,p) => b || p.name === newName,
	    false)){
	    alert(`${newName} already in the phonebook`)
	}
	else{
	    const personObject = {
		name: newName
	    }

	    setPersons(persons.concat(personObject))
	}
	setNewName('')
    }

    const hInputChg = (event) =>
	setNewName(event.target.value)

    return (
	<>
	    <h2>Phonebook</h2>
	    <form onSubmit={addPerson}>
		<label>Name:
		    <input value={newName} onChange={hInputChg} />
		</label>
		<button type="submit">add</button>
	    </form>
	    <h2>Numbers</h2>
	    <ul>
		{persons.map(p =>
		    <Entry key={p.name} person={p} />
		)}
	    </ul>
	</>
    )
}

export default App
