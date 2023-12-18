const Header = (props) => {
    return (
	<h1>{props.course}</h1>
    )
}

const Content = (props) => {
    return (
	<>
	    <Part pt={props.pt[0].name} ex={props.pt[0].exercises} />
	    <Part pt={props.pt[1].name} ex={props.pt[1].exercises} />
	    <Part pt={props.pt[2].name} ex={props.pt[2].exercises} />
	</>
    )
}

const Part = (props) => {
    return (
	<p>{props.pt} {props.ex}</p>
    )
}

const Total = (props) => {
    let sum = 0
    props.pt.forEach( v => { sum += v.exercises } )
    return (
	<p>Number of exercises {sum}</p>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const parts = [
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

    return (
	<>
	    <Header course={course} />
	    <Content pt={parts} />
	    <Total pt={parts} /> 
	</>
    )
}

export default App
