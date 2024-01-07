const PersonForm = (props) => {
    const aH = props.addHandler
    const nV = props.nameVal
    const nH = props.nameHandler
    const numV = props.numberVal
    const numH = props.numberHandler

    return (
	<form onSubmit={aH}>
	    <label>Name:
		<input value={nV} onChange={nH} />
	    </label>

	    <br />

	    <label>Number:
		<input value={numV} onChange={numH} />
	    </label>

	    <br />

	    <button type="submit">add</button>
	</form>
    )
}

export default PersonForm
