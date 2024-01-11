import { useState, useEffect } from 'react'
import countriesService from './services/countries.js'
import Countries from './components/countries.jsx'

const App = () => {
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState(null)

    useEffect( () => {
	countriesService
	    .getAll()
	    .then( data => {
		setCountries(data)
	    })
	    .catch(error =>
		console.log(error.message)
	    )
    }, [] )

    const handleSearch = (event) =>
	setSearch(event.target.value)

    return (
	<>
	    <p>find countries:
		<input value={search} onChange={handleSearch} />
	    </p>
	    <Countries data={countries} search={search} />
	</>
    )
}

export default App
