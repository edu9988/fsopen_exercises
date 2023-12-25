import { useState } from 'react'

const StatisticLine = ({text, value, unit}) => <tr><td>{text}</td><td>{value} {unit}</td></tr>

const Button = ({onC , txt}) => <button onClick={onC}>{txt}</button>

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
	    <table><tbody>
		<StatisticLine text="good" value={g} />
		<StatisticLine text="neutral" value={n} />
		<StatisticLine text="bad" value={b} />
		<StatisticLine text="all" value={g+n+b} />
		<StatisticLine text="average" value={avg} />
		<StatisticLine text="positive" value={pos} unit="%" />
	    </tbody></table>
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
	    <Button onC={hGood} txt="good" />
	    <Button onC={hNeutral} txt="neutral" />
	    <Button onC={hBad} txt="bad" />
	    <h1>statistics</h1>
	    <Statistics d={data} />
	</>
    )
}

export default App
