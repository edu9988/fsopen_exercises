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
		data.forEach( country => {
		    Object.defineProperty( country , 'view' , {value: false, writable: true} )
		})
		setCountries(data)
	    })
	    .catch(error =>
		console.log(error.message)
	    )
    }, [] )

    const handleSearch = (event) =>
	setSearch(event.target.value)

    const handleView = (country) => {
	setCountries(countries.map(c => {
	    if( c.name.common === country )
		c.view = !c.view
	    return c
	}))
    }

    return (
	<>
	    <p>find countries:
		<input value={search} onChange={handleSearch} />
	    </p>
	    <Countries data={countries} search={search} hView={handleView} />
	</>
    )
}

export default App
