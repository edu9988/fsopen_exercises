import weatherServices from '../services/weather.js'

const MultipleEntries = ({ countries, hView, weather }) => {
    return (
	<ul>
	    {countries.map( (c,i) =>
		<li key={c.name.common}>
		    {c.view ? <>
			<h1>
			    {c.name.common}
			    <button onClick={()=>hView(c.name.common)}>Hide</button>
			</h1>
			<Detailed
			    country={c}
			    countryWeather={weather.find(w => w.country === c.name.common)} />
		    </>	: <>
			{c.name.common}
			<button onClick={()=>hView(c.name.common)}>show</button>
		    </>}
		</li>
	    )}
	</ul>
    )
}

const Languages = ({ data }) => {
    let vec = []
    for( var propt in data )
	vec.push({key:propt , text:data[propt]})

    return (
	    <ul>
		{vec.map( l =>
		    <li key={l.key}>{l.text}</li>
		)}
	    </ul>
    )
}

const iconType = (weatherId, isDay) => {
    if( weatherId >= 200 && weatherId <= 232 )
	return '11d'
    else if( weatherId >= 300 && weatherId <= 321 ||
	weatherId >= 520 && weatherId <= 531 )
	return '9d'
    else if( weatherId >= 500 && weatherId <= 504 ){
	if( isDay )
	    return '10d'
	else
	    return '10n'
    }
    else if( weatherId === 511 ||
	weatherId >= 600 && weatherId <= 622 )
	return '13d'
    else if( weatherId >= 701 && weatherId <= 781 )
	return '50d'
    else if( weatherId === 800 ){
	if( isDay )
	    return '01d'
	else
	    return '01n'
    }
    else if( weatherId === 801 ){
	if( isDay )
	    return '02d'
	else
	    return '02n'
    }
    else if( weatherId === 802 )
	return '03d'
    else if( weatherId === 803 )
	return '04d'
    else if( weatherId === 804 )
	return '04d'
    else
	return '11n'
}

const CountryWeather = ({ cw }) => {
    const wId = cw.weather.weather[0].id
    const day = cw.weather.dt > cw.weather.sys.sunrise &&
	cw.weather.dt < cw.weather.sys.sunset
    const wType = iconType(wId,day)
    const source = `https://openweathermap.org/img/wn/${wType}@2x.png`

    return (
	<>
	    <p>temperature {Math.round(100*(cw.weather.main.temp-273.15))/100} Celsius</p>
	    <img src={source}/>
	    <p>wind {cw.weather.wind.speed} m/s</p>
	</>
    )
}

const Detailed = ({ country, countryWeather }) => {
    return (
	<>
	    <p>capital {country.capital.find(()=>true)}</p>
	    <p>area {country.area} km²</p>
	    <h3>Languages:</h3>
	    <Languages data={country.languages} />
	    <img src={country.flags.svg}
		width="50%" />
	    <h2>Weather in {country.capital[0]}</h2>
	    {countryWeather ?
		<CountryWeather cw={countryWeather} /> :
		<p>Weather unavailable</p>
	    }
	</>
    )
}

const Countries = ({ data, search, hView, hFetch, weather }) => {
    if( !data || search === '' )
	return null

    const toBeShown = data.filter(country => {
	return (
	    country.name.common.toLowerCase().includes(search.toLowerCase())
	)
    })

    if( toBeShown.length === 0 )
	return <p>No matches, specify another filter</p>

    if( toBeShown.length > 10 )
	return <p>Too many matches, specify another filter</p>

    if( toBeShown.length > 1 )
	return <MultipleEntries countries={toBeShown} hView={hView} weather={weather} />

    const country = toBeShown.find(() => true)
    hFetch(country.name.common)
    const countryWeather = weather.find(w => w.country === country.name.common)

    return (
	<>
	    <h1>{country.name.common}</h1>
	    <Detailed country={country} countryWeather={countryWeather}/>
	</>
    )
}

export default Countries
