import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div className="job-container">
    <Header />

    <div className="notfound-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="notfound"
      />
      <h1 className="page">Page Not Found</h1>
      <p className="not-found-page">
        we’re sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)

export default NotFound
