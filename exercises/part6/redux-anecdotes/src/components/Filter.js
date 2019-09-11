import React from 'react'
import { connect } from 'react-redux'
import {filter} from './../reducers/filterReducer'

const Filter = (props) => {
  const filterAnecdote = (e) => {
    const content = e.target.value
    props.filter(content)
  }

  return (
    <div>
      Filter: <input name="filter" onChange={filterAnecdote}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = {
  filter
}

const ConnectedNotification = connect (mapStateToProps, mapDispatchToProps)(Filter)

export default ConnectedNotification