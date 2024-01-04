const Entry = ({ person }) =>
    <li>{person.name} {person.number}</li>

const Persons = ({ persons, search }) => {
    return (
	<ul>
	    {persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(p =>
		<Entry key={p.id} person={p} />
	    )}
	</ul>
    )
}

export default Persons
