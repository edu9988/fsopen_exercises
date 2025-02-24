import PropTypes from 'prop-types'

const LogoutPar = ({ username, handleLogout }) => (
  <p>{username} logged-in <button onClick={handleLogout}>logout</button></p>
)

LogoutPar.propTypes = {
  username: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default LogoutPar
