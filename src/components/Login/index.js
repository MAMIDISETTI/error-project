import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="login-page-input-label" htmlFor="password">
          Password*
        </label>
        <input
          type="password"
          id="password"
          className="login-page-password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="login-page-input-label" htmlFor="username">
          Username*
        </label>
        <input
          type="text"
          id="username"
          className="login-page-password-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  onSubmitSuccessForm = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailureForm = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccessForm(data.jwt_token)
    } else {
      this.onSubmitFailureForm(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page-bg-container">
        <img
          className="login-page-left-pic"
          src="https://res.cloudinary.com/dq8h4f4kb/image/upload/v1643795205/MiniProject/Rectangle_1467Login_Book_Logo_qxf2ar.svg"
          alt="website login"
        />
        <img
          className="login-left-pic-mobile-view"
          src="https://res.cloudinary.com/dq8h4f4kb/image/upload/v1643801838/MiniProject/Ellipse_99mobile_view_login_page_image_n77lv1.png"
          alt="website login"
        />
        <div className="login-page-form-container">
          <form className="login-form-container" onSubmit={this.onSubmitForm}>
            <div className="login-form-logo-container">
              <img
                src="https://res.cloudinary.com/dq8h4f4kb/image/upload/v1643955306/MiniProject/Group_7731book_hub_logo_dzbf3w.png"
                alt="login website logo"
                className="login-page-bookhub-logo"
              />
            </div>
            <div className="login-page-input-container">
              {this.renderUsernameField()}
            </div>
            <div className="login-page-input-container">
              {this.renderPasswordField()}
            </div>
            <button type="submit" className="login-form-login-button">
              Login
            </button>
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
        <div className="login-page-form-container-small">
          <form
            className="login-form-container-small"
            onSubmit={this.onSubmitForm}
          >
            <div className="login-form-logo-container">
              <img
                src="https://res.cloudinary.com/dq8h4f4kb/image/upload/v1643955306/MiniProject/Group_7731book_hub_logo_dzbf3w.png"
                alt="login website logo"
                className="login-page-bookhub-logo"
              />
            </div>
            <div className="login-page-input-container">
              {this.renderUsernameField()}
            </div>
            <div className="login-page-input-container">
              {this.renderPasswordField()}
            </div>
            <button type="submit" className="login-form-login-button">
              Login
            </button>
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
