const Header = (props) => {
    return (
	<h1>{props.crs.name}</h1>
    )
}

const Content = (props) => {
	const part = props.crs.parts
	return (
	<>
	    <Part pt={part[0]} />
	    <Part pt={part[1]} />
	    <Part pt={part[2]} />
	</>
    )
}

const Part = (props) => {
    return (
	<p>{props.pt.name} {props.pt.exercises}</p>
    )
}

const Total = (props) => {
    let sum = 0
    props.crs.parts.forEach( v => { sum += v.exercises } )
    return (
	<p>Number of exercises {sum}</p>
    )
}

const App = () => {
    const course = {
	name: 'Half Stack application development',
	parts: [
	    {
		name: 'Fundamentals of React',
		exercises: 10
	    },
	    {
		name: 'Using props to pass data',
		exercises: 7
	    },
	    {
		name: 'State of a component',
		exercises: 14
	    }
	]
    }

    return (
	<>
	    <Header crs={course} />
	    <Content crs={course} />
	    <Total crs={course} /> 
	</>
    )
}

export default App
