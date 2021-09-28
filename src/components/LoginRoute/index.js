import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', showErrorMessage: false, error: ''}

  setToken = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 30})
    history.replace('/')
  }

  showError = err => {
    console.log(err)
    this.setState({showErrorMessage: true, error: err})
  }

  submitDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      this.setToken(data)
    } else {
      const data = await response.json()
      this.showError(data.error_msg)
    }
  }

  updateUserName = event => {
    this.setState({username: event.target.value})
  }

  updateUserPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const JwtToken = Cookies.get('jwt_token')
    if (JwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {showErrorMessage, error} = this.state
    return (
      <div className="bg-container">
        <form className="form-container" onSubmit={this.submitDetails}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-image"
          />
          <div className="main-username-container">
            <div className="username-container">
              <label htmlFor="userName" className="username-name">
                USERNAME
              </label>
              <br />
              <input
                id="userName"
                type="text"
                className="username-bar"
                placeholder="Username"
                onChange={this.updateUserName}
              />
            </div>
            <div className="username-container">
              <label htmlFor="password" className="username-name">
                PASSWORD
              </label>
              <br />
              <input
                id="password"
                type="password"
                className="username-bar"
                placeholder="Password"
                onChange={this.updateUserPassword}
              />
            </div>
          </div>

          <button type="submit" className="login">
            LogIn
          </button>
          {showErrorMessage && <p className="error-message">*{error}</p>}
        </form>
      </div>
    )
  }
}

export default LoginRoute
