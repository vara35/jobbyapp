import {BsStarFill, BsFillBagFill} from 'react-icons/bs'
import {VscLocation} from 'react-icons/vsc'

import './index.css'

const SimilarJobsItem = props => {
  const {getItem} = props

  return (
    <li className="similar-list-item-one">
      <div className="star-image-container">
        <img
          src={getItem.companyLogoUrl}
          alt="similar job company logo"
          className="similar-logo"
        />
        <div className="company-name-container">
          <h1 className="title">{getItem.title}</h1>
          <div className="star-container">
            <BsStarFill className="star" />
            <p className="rating">{getItem.rating}</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="description-similar">Description</h1>
        <p className="similar-description">{getItem.jobDescription}</p>
      </div>

      <div className="location-main-container">
        <div className="location-container">
          <VscLocation className="location" />
          <p className="location-name">{getItem.location}</p>
        </div>
        <div className="location-container">
          <BsFillBagFill className="location" />
          <p className="location-name">{getItem.employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobsItem
