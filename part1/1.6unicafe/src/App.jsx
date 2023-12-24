import { useState } from 'react'

const Display = ({name, result}) => <p>{name} {result}</p>

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const hGood = () => setGood(good+1)
    const hNeutral = () => setNeutral(neutral+1)
    const hBad = () => setBad(bad+1)

    return (
	<>
	    <h1>give feedback</h1>
	    <button onClick={hGood}>good</button>
	    <button onClick={hNeutral}>neutral</button>
	    <button onClick={hBad}>bad</button>
	    <h1>statistics</h1>
	    <Display name="good" result={good} />
	    <Display name="neutral" result={neutral} />
	    <Display name="bad" result={bad} />
	</>
    )
}

export default App
