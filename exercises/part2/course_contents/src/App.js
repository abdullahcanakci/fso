import React, {useState} from 'react'
import Course from './components/Course'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Display = ({counter}) => {
  return (
    <div>{counter}</div>
  )
}

const App = ({courses}) => {
  const [counter, setCounter] = useState(0)

  console.log("Counter " + counter)

  const setToValue = (value) => {
    return () =>{
      setCounter(value)
    }
  }

  const courseComponents = () => (
    courses.map(
      course => <Course 
          key={course.id} 
          course={course}
        />
    )
  )

  return (
    <div>
      {courseComponents()}
    </div>
  )
}

export default App