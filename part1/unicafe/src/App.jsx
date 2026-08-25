import { useState } from 'react'

const Header = ({text}) => <div><h1>{text}</h1></div>
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const Statistics = ({good, neutral, bad, all, average, positive}) => {
  if(good == 0 && bad == 0 && neutral == 0){
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good}/>
        <StatisticLine text='neutral' value={neutral}/>
        <StatisticLine text='bad' value={bad}/>
        <StatisticLine text='all' value={all}/>
        <StatisticLine text='average' value={average}/>
        <StatisticLine text='positive' value={positive}/>
      </tbody>
   </table>
  )
}

const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    const tot = updatedGood + neutral + bad
    setTotal(tot)
    setAverage(tot/3)
    setPositive((updatedGood/tot) * 100)
  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    const tot = updatedNeutral + good + bad
    setTotal(tot)
    setAverage(tot/3)
    setPositive((good/tot) * 100)
  }
  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    const tot = updatedBad + neutral + good
    setTotal(tot)
    setAverage(tot/3)
    setPositive((good/tot) * 100)
  }

  const positvePercentage = positive + " %"

  return (
    <div>
      <Header text="give feedback"/>
      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick} text="neutral"/>
      <Button onClick={handleBadClick} text="bad"/>
      <Header text="statistics"/>
      <Statistics good={good} bad={bad} neutral={neutral} all={total} average={average} positive={positvePercentage}/>
    </div>
  )
}

export default App
