import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const Notes = ({ notes, toggleImportance}) => {
  const rows = () => notes.map(note =>
    <Note
      key={note.id}
      note={note}
      toggleImportance={toggleImportance}
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

  useEffect(() => {
    noteService
      .getAll()
      .then(notes=>{
        setNotes(notes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const n = {
      content: newNote,
      date: new Date().toISOString(),
      id: notes.length + 1,
      important: Math.random() > 0.5
    }
    
    noteService
      .create(n)
      .then(note => {
        setNotes(notes.concat(note))
      })

    setNewNote('')
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changeNote = {...note, important: !note.important}

    noteService
      .update(id, changeNote)
      .then(nd => {
        setNotes(notes.map(n => n.id !== id ? n : nd))
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      <Notes notes={notesToShow} toggleImportance={toggleImportanceOf}/>
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