const Notification = ({ message }) => {
  const border = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    borderColor: 'red'
  }

  return <p style={border}>{message}</p>
}

export default Notification