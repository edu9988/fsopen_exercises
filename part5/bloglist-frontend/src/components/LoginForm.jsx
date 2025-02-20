const LoginForm = ({ handleLogin, user, setUser, passwd, setPasswd }) => (
  <form onSubmit={handleLogin}>
    <div>
      <label htmlFor="username">username</label>
      <input
        type="text"
        value={user}
        name="username"
        id="username"
        onChange={({ target }) => setUser(target.value)}
      />
    </div>
    <div>
      <label htmlFor="password">password</label>
      <input
        type="password"
        value={passwd}
        name="Password"
        id="password"
        onChange={({ target }) => setPasswd(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm
