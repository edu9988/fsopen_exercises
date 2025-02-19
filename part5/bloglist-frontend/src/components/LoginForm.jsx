const LoginForm = ({ handleLogin, user, setUser, passwd, setPasswd }) => (
  <form onSubmit={handleLogin}>
    <div>
      <label>username</label>
      <input
        type="text"
        value={user}
        name="Username"
        onChange={({ target }) => setUser(target.value)}
      />
    </div>
    <div>
      <label>password</label>
      <input
        type="password"
        value={passwd}
        name="Password"
        onChange={({ target }) => setPasswd(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm
