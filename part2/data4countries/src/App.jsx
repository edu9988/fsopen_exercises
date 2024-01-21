import { useState, useEffect } from 'react'
import getCountries from './services/countries.js'
import Countries from './components/countries.jsx'
import getWeather from './services/weather.js'

const api_key = import.meta.env.VITE_WEATHER_KEY

const App = () => {
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState(null)
    const [weather, setWeather] = useState([])

    useEffect( () => {
	getCountries()
	    .then( data => {
		data.forEach( country => {
		    Object.defineProperty( country , 'view' , {value: false, writable: true} )
		})
		setCountries(data)
		getWeather(
		    DiegoGarcia,
		    IO,
		    api_key
		)
		    .then(data => setWeather(weather.concat([{country:'British Indian Ocean Territory',weather:data}])))
	    })
	    .catch(error =>
		console.log('countries:',error.message)
	    )
    }, [] )

    const handleSearch = (event) =>
	setSearch(event.target.value)

    const handleFetch = (countryName) => {
	if( !weather.some(w => w.country === countryName) ){
	    const aux_country = countries.find(c => c.name.common === countryName)
	    getWeather(
		aux_country.capital[0],
		aux_country.cca2,
		api_key
	    )
		.then( weatherData => {
		    setWeather(weather.concat([{
			country: aux_country.name.common,
			weather: weatherData
		    }]))
		})
		.catch(error =>
		    console.log(`${countryName} weather:`,error.message)
		)
	}
    }

    const handleView = (countryName) => {
	setCountries(countries.map(c => {
	    if( c.name.common === countryName )
		c.view = !c.view
	    return c
	}))
	handleFetch(countryName)
    }

    return (
	<>
	    <p>find countries:
		<input value={search} onChange={handleSearch} />
	    </p>
	    <Countries data={countries} search={search} hView={handleView} hFetch={handleFetch} weather={weather} />
	</>
    )
}

export default App
