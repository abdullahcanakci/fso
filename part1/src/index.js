import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Header = ({name}) => (
  <h1>{name}</h1>
)

const Part = (props) => {
  const {name, exercises} = props.part
  return (
    <p>{name} {exercises}</p>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  )
}

const Total = ({total}) => {
  return (
    <p>Number of exercises {total}</p>
  )
}

const Display = ({counter}) => {
  return (
    <div>{counter}</div>
  )
}

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)


const App = (props) => {
  const [counter, setCounter] = useState(0)

  console.log("Counter " + counter)

  const setToValue = (value) => {
    return () =>{
      setCounter(value)
    }
  }

  const course = {
    name: 'Half Stack application development',
    parts : [
      {
        name: 'Fundementals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ],
    exercises: function(){
      let total = 0
      this.parts.forEach(part => {
        total += part.exercises
      });
      return total
    }
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total total={course.exercises()} />

      <Display counter={counter}/>
      <Button onClick={setToValue(counter+1)} text='plus'/>
      <Button onClick={setToValue(counter-1)} text='minus'/>
      <Button onClick={setToValue(0)} text='zero'/>
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)


