import './index.css'
import {Link} from 'react-router-dom'
import {BsStarFill, BsFillBagFill} from 'react-icons/bs'

import {VscLocation} from 'react-icons/vsc'

const JobDescription = props => {
  const {jobItem} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    id,
    packagePerAnnum,
    rating,
    title,
  } = jobItem

  return (
    <Link to={`/jobs/${id}`} className="textDecoration">
      <li className="list-item-job">
        <div className="image-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="company-name-container">
            <h1 className="title">{title}</h1>
            <div className="star-container">
              <BsStarFill className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="package-container">
          <div className="location-main-container">
            <div className="location-container">
              <VscLocation className="location" />
              <p className="location-name">{location}</p>
            </div>
            <div className="location-container">
              <BsFillBagFill className="location" />
              <p className="location-name">{employmentType}</p>
            </div>
          </div>
          <h1 className="package">{packagePerAnnum}</h1>
        </div>
        <hr className=" hr-two" />
        <div className="desciption-container">
          <h1 className="title-two">Description</h1>
          <p className="description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobDescription
