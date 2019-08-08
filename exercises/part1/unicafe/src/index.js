import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}
const Stat = ({ stat }) => {
  return (
    <tr>
      <td>{stat.name}</td>
      <td>{stat.value}</td>
    </tr>
  )
}
const Statistics = ({ stats }) => {
  if (stats[3].value === 0) {
    return (<p>No feedback given</p>)
  }
  return (

    <table>
      <tbody>
        <Stat stat={stats[0]} />
        <Stat stat={stats[1]} />
        <Stat stat={stats[2]} />
        <Stat stat={stats[3]} />
        <Stat stat={stats[4]} />
        <Stat stat={stats[5]} />
      </tbody>
    </table>

  )

}

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0, neutral: 0, bad: 0, all: 0,
  })

  const handleGoodFeedback = () => {
    setFeedback({ ...feedback, good: feedback.good + 1, all: feedback.all + 1 })
  }
  const handleNeutralFeedback = () => {
    setFeedback({ ...feedback, neutral: feedback.neutral + 1, all: feedback.all + 1 })
  }
  const handleBadFeedback = () => {
    setFeedback({ ...feedback, bad: feedback.bad + 1, all: feedback.all + 1 })
  }

  const average = (feedback.good + feedback.bad) / feedback.all
  const positive = feedback.good / feedback.all

  const stats = [
    {
      name: 'good',
      value: feedback.good
    },
    {
      name: 'neutral',
      value: feedback.neutral
    },
    {
      name: 'bad',
      value: feedback.bad
    },
    {
      name: 'all',
      value: feedback.all
    },
    {
      name: 'average',
      value: average
    },
    {
      name: 'positive',
      value: positive
    }
  ]

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={handleGoodFeedback} text='good' />
      <Button onClick={handleNeutralFeedback} text='neutral' />
      <Button onClick={handleBadFeedback} text='bad' />
      <h1>Statistics</h1>
      <Statistics stats={stats} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
