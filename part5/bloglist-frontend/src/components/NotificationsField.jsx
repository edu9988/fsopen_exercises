const NotificationsField = ({ message }) => {
  if (message.content === null) {
    return null
  }

  return (
    <p className={message.success?'warning':'error'}>
      {message.content}
    </p>
  )
}

export default NotificationsField
