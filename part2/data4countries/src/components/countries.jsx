const MultipleEntries = ({ countries, hView }) => {
    return (
	<ul>
	    {countries.map( (c,i) =>
		<li key={c.name.common}>
		    {c.view ? <>
			<h1>
			    {c.name.common}
			    <button onClick={()=>hView(c.name.common)}>Hide</button>
			</h1>
			<Detailed country={c} />
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

const Detailed = ({ country }) => {
    return (
	<>
	    <p>capital {country.capital.find(()=>true)}</p>
	    <p>area {country.area}</p>
	    <h2>Languages:</h2>
	    <Languages data={country.languages} />
	    <img src={country.flags.svg}
		width="50%" />
	</>
    )
}

const Countries = ({ data, search, hView }) => {
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
	return <MultipleEntries countries={toBeShown} hView={hView} />

    return (
	<>
	    <h1>{toBeShown.find(()=>true).name.common}</h1>
	    <Detailed country={toBeShown.pop()} />
	</>
    )
}

export default Countries
