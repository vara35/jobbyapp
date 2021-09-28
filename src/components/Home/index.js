import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'
import Header from '../Header'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="home-container">
      <Header />
      <div className="home-container-bottom">
        <h1 className="home-name">
          Find The Job That
          <br /> Fits Your Life
        </h1>
        <p className="home-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="find-jobs">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
