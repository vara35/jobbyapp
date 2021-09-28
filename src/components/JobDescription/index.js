import './index.css'
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
    <li className="list-item">
      <div className="image-container">
        <img src={companyLogoUrl} alt="company logo" className="company-logo" />
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
            <h1 className="location-name">{location}</h1>
          </div>
          <div className="location-container">
            <BsFillBagFill className="location" />
            <h1 className="location-name">{employmentType}</h1>
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
  )
}

export default JobDescription
