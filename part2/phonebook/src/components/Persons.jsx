const Entry = ({ person, handleDelete }) =>
    <li>
	{person.name} {person.number}
	<button onClick={handleDelete}>Delete</button>
    </li>

const Persons = ({ persons, search, hDel }) => {
    return (
	<ul>
	    {persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(p =>
		<Entry
		    key={p.id}
		    person={p}
		    handleDelete={() => hDel(p.id)}
		/>
	    )}
	</ul>
    )
}

export default Persons
