import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const visible = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const invisible = {display: 'none'}
  const style = props.notification !== '' ? visible : invisible
  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}


const ConnectedNotification = connect (mapStateToProps)(Notification)

export default ConnectedNotification