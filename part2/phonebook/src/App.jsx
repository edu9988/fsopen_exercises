import { useState , useEffect } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import personService from './services/person.js'

const Notification = ({ message }) => {
    if( message.content === null ){
	return null
    }

    return (
	    <p className={message.success?'warning':'error'}>
		{message.content}
	    </p>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')
    const [msg, setMsg] = useState({content:null,success:true})

    useEffect( () => {
	personService
	    .getAll()
	    .then(data => setPersons(data))
    }, [])

    const showSuccess = (text) => {
	setMsg({
	    content: text,
	    success: true
	})
	setTimeout(() => {
	    setMsg({
		content: null,
		success: true
	    })}
	    ,12000
	)
    }

    const showFailure = (text) => {
	setMsg({
	    content: text,
	    success: false
	})
	setTimeout(() => {
	    setMsg({
		content: null,
		success: true
	    })}
	    ,12000
	)
    }

    const easyErr = (error) => {
	if( error === undefined )
	    return "error undefined"
	if( error.response === undefined )
	    return error.message
	if( error.response.data === undefined ){
	    console.log(error.response)
	    return "error.response.data undefined"
	}
    if( error.response.data.error === undefined ){
        console.log(error.response.data)
        return error.response.data.toString()
    }
	return error.response.data.error
    }

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
		    .then(data => {
			setPersons(persons.map(p =>
			    p.id === oldUser.id ? data : p
			))
			showSuccess(`Updated ${newName}`)
		    })
		    .catch(error => {
			const err = easyErr(error)
			showFailure(`Failed to update ${newName}: ${err}`)
			setPersons(persons.filter(p => 
			    p.id !== oldUser.id
			))
		    })
		setNewName('')
		setNewNumber('')
	    }
	    else { /* window.confirm returned false */
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
		    showSuccess(`Added ${newName}`)
		})
		.catch(error => {
		    const err = easyErr(error)
		    showFailure(`Failed to add ${newName}: ${err}`)
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
	const delName = persons.find(p => p.id === id).name
	if( window.confirm(
	    `Delete ${delName}?`
	) ){
	    personService
		.remove(id)
		.then(() =>
		    showSuccess(`Deleted ${delName}`)
		)
		.catch(error => {
		    const err = easyErr(error)
		    showFailure(`Failed to delete ${delName} from database: ${err}`)
		})
	    setPersons(persons.filter(p => p.id !== id))
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

	    <Notification message={msg} />

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
