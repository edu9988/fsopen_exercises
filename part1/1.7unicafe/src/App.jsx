import { useState } from 'react'

const Display = ({name, result, unit}) => <p>{name} {result} {unit}</p>

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const hGood = () => setGood(good+1)
    const hNeutral = () => setNeutral(neutral+1)
    const hBad = () => setBad(bad+1)

    let pos = 0
    let avg = 0
    if ( good+neutral+bad != 0 ){
	avg = (good-bad)/(good+neutral+bad)
	pos = 100*good/(good+neutral+bad)
    }

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
	    <Display name="all" result={good+neutral+bad} />
	    <Display name="average" result={avg} />
	    <Display name="positive" result={pos} unit="%"/>
	</>
    )
}

export default App
