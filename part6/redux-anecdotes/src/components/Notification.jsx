import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    padding: 10,
    borderWidth: 2,
    backgroundColor: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    color: 'green'
  }

  if( notification.length === 0 )
    return null
  else
    return (
      <div style={style}>
        {notification}
      </div>
    )
}

export default Notification
