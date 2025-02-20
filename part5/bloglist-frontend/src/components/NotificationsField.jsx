const NotificationsField = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <p className='error'>
      {message}
    </p>
  )
}

export default NotificationsField
