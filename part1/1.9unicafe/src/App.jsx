import { useState } from 'react'

const Display = ({name, result, unit}) => <p>{name} {result} {unit}</p>

const Statistics = (props) => {
    const g = props.d[0].good
    const n = props.d[1].neutral
    const b = props.d[2].bad

    let avg = 0
    let pos = 0
    
    if ( g+n+b != 0 ) {
	avg = (g-b)/(g+n+b)
	pos = 100*g/(g+n+b)

	return (
	    <>
		<Display name="good" result={g} />
		<Display name="neutral" result={n} />
		<Display name="bad" result={b} />
		<Display name="all" result={g+n+b} />
		<Display name="average" result={avg} />
		<Display name="positive" result={pos} unit="%" />
	    </>
	)
    }

    return <p>No feedback given</p>
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const hGood = () => setGood(good+1)
    const hNeutral = () => setNeutral(neutral+1)
    const hBad = () => setBad(bad+1)

    const data = [ {good} , {neutral} , {bad} ]

    return (
	<>
	    <h1>give feedback</h1>
	    <button onClick={hGood}>good</button>
	    <button onClick={hNeutral}>neutral</button>
	    <button onClick={hBad}>bad</button>
	    <h1>statistics</h1>
	    <Statistics d={data} />
	</>
    )
}

export default App
