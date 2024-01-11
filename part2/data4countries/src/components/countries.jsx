const MultipleEntries = ({ countries }) =>{
    return (
	<ul>
	    {countries.map(c =>
		<li key={c.name.common}>
		    {c.name.common}
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

const SingleEntry = ({ country }) => {
    return (
	<>
	    <h1>{country.name.common}</h1>
	    <p>capital {country.capital.find(()=>true)}</p>
	    <p>area {country.area}</p>
	    <h2>Languages:</h2>
	    <Languages data={country.languages} />
	    <img src={country.flags.svg}
		width="50%" />
	</>
    )
}

const Countries = ({ data, search }) => {
    if( !data || search === '' )
	return null

    const toBeShown = data.filter(country => 
	country.name.common.toLowerCase().includes(search.toLowerCase())
    )

    if( toBeShown.length === 0 )
	return <p>No matches, specify another filter</p>

    if( toBeShown.length > 10 )
	return <p>Too many matches, specify another filter</p>

    if( toBeShown.length > 1 )
	return <MultipleEntries countries={toBeShown} />

    return <SingleEntry country={toBeShown.pop()} />
}

export default Countries
