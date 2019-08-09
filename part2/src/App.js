import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const Notes = ({ notes }) => {
  const rows = () => notes.map(note =>
    <Note
      key={note.id}
      note={note}
    />
  )

  return (
    <ul>
      <h1>Notes</h1>
      {rows()}
    </ul>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data)
      })
  }

  useEffect(hook, [])

  const addNote = (event) => {
    event.preventDefault()
    const n = {
      content: newNote,
      date: new Date().toISOString(),
      id: notes.length + 1,
      important: Math.random() > 0.5
    }
    setNotes(notes.concat(n))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      <Notes notes={notesToShow} />
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App