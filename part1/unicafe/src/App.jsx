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
const Anecdote = ({anecdotes, selected, votes}) => <div>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      </div>

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

  const positivePercentage = positive + " %"

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const handleSelection = () => {
    const randomNumber = Math.floor(Math.random() * 8);
    setSelected(randomNumber);
  }

  const [votes, setVotes] = useState(Array(8).fill(0));
  const captureVotes = ({index}) => {
    const copy = [...votes]
    copy[index] += 1;
    setVotes(copy)
  }

  const mostVotedIndex = votes.indexOf(Math.max(...votes))


  return (
    <div>
      <Header text="give feedback"/>
      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick} text="neutral"/>
      <Button onClick={handleBadClick} text="bad"/>

      <Header text="statistics"/>
      <Statistics good={good} bad={bad} neutral={neutral} all={total} average={average} positive={positivePercentage}/>

      <Header text="Anecdote of the day"/>
      <Anecdote anecdotes={anecdotes} selected={selected} votes={votes}/>
      <Button onClick={() => captureVotes({ index: selected })} text="vote"/>
      <Button onClick={handleSelection} text="next anecdote"/>
      
      <Header text="Anecdote with most votes"/>
      <Anecdote anecdotes={anecdotes} selected={mostVotedIndex} votes={votes}/>
    </div>
  )
}

export default App
