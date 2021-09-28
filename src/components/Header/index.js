import './index.css'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

const Header = props => {
  const removeToken = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="logo-image-two"
        />
      </Link>

      <div className="route-container">
        <Link to="/" className="home-route">
          <h1>Home</h1>
        </Link>
        <Link to="/jobs" className="home-route">
          <h1>Jobs</h1>
        </Link>
      </div>
      <div>
        <button type="button" className="logout" onClick={removeToken}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
