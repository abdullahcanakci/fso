import React from 'react'

const Header = ({name}) => (
  <h1>{name}</h1>
)

const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({parts}) => {
  const partComponents = () => parts.map(part => <Part key={part.id} part={part} />)
  return (
    <div>
      {partComponents()}
    </div>
  )
}


const Course = ({course}) => {
  const reducer = (sum, cur) => sum += cur.exercises
  const sum = () => (course.parts.reduce(reducer, 0))
  return (
    <div>
      <Header name = {course.name}/>
      <Content parts={course.parts}/>
      <h4>total of {sum()} exercises</h4>
    </div>
  )
}

export default Course