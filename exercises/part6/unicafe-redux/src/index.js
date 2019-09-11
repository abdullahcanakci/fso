import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const Statistic = ({stats}) => {
  const statViews = stats.map(stat => <div key={Math.floor(Math.random() * 1000)}>{stat.name} {stat.value}</div>)
  return (
    <div>{statViews}</div>
  )
}

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const state = store.getState()

  const all = state.good + state.ok + state.bad
  const average = (state.good + state.bad) / all
  const positive = state.good / all

  const stats = [
    {
      name: 'good',
      value: state.good
    },
    {
      name: 'ok',
      value: state.ok
    },
    {
      name: 'bad',
      value: state.bad
    },
    {
      name: 'all',
      value: all ? all: 0
    },
    {
      name: 'average',
      value: average ? average : 0
    },
    {
      name: 'positive',
      value: positive ? positive : 0
    }
  ]
  console.log(state)

  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <button onClick={ e => good() }>GOOD</button>
        <button onClick={ e => ok() }>OK</button>
        <button onClick={ e => bad() }>BAD</button>
      </div>
      <h1>Statistics</h1>
      <Statistic stats={stats} />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)