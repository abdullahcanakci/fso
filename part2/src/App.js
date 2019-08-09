import React from 'react'
import Note from './components/Note'

const Notes = ({ notes }) => {
  const rows = () => notes.map(note =>
    <Note
      key={note.id}
      note={note}
    />
  )

  return (
    <div>
      <h1>Notes</h1>
      {rows()}
    </div>
  )
}

const App = ({ notes }) => {
  return (
    <div>
      <p>Hello World</p>
      <Notes notes={notes} />
    </div>
  )
}

export default App