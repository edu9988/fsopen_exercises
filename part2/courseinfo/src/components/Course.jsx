const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) =>
    <p>
	{part.name} {part.exercises}
    </p>

const Content = ({ parts }) => {

    return (
	<>
	    {parts.map(p => <Part key={p.id} part={p} />)}
	</>
    )
}

const Sum = ({ parts }) =>{
    const count = parts.reduce( (s,p) => s+p.exercises , 0 )
    /*let count = 0*/
    /*parts.forEach(p => count += p.exercises)*/

    return (
	<p><strong>total of {count} exercises</strong></p>
    )
}

const Course = ({ course }) => {
    return <>
	<Header course={course.name} />
	<Content parts={course.parts} />
	<Sum parts={course.parts} />
    </>
}

export default Course
