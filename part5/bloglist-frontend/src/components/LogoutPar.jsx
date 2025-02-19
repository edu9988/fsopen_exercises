const LogoutPar = ({ username, handleLogout }) => (
  <p>{username} logged-in <button onClick={handleLogout}>logout</button></p>
)

export default LogoutPar
