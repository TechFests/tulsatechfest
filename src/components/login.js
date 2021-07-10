import React from "react"
import { navigate } from "gatsby"
import { handleLogin, isLoggedIn } from "../services/auth"

class Login extends React.Component {
  state = {
    username: ``,
    password: ``,
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    handleLogin(this.state)
  }

  render() {
    if (isLoggedIn()) {
      navigate(`/app/profile`)
    }

    return (
      <>
        <h1>Log in</h1>
        <form
          method="post"
          onSubmit={event => {
            this.handleSubmit(event)
            navigate(`/app/profile`)
          }}
        >
          <div className="form-group">
          <label className="form-label">
            Username
            <input type="text" name="username" className="form-control" onChange={this.handleUpdate} />
          </label>
          </div>
          <div className="form-group">
          <label className="form-label">
            Password
            <input
              type="password"
              name="password"
              onChange={this.handleUpdate}
              className="form-control"
            />
          </label>
          </div>
          <input type="submit" value="Log In" />
        </form>
      </>
    )
  }
}

export default Login