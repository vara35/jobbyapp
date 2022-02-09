import Cookies from 'js-cookie'
import {BsStarFill, BsFillBagFill} from 'react-icons/bs'
import {HiExternalLink} from 'react-icons/hi'
import Loader from 'react-loader-spinner'

import {VscLocation} from 'react-icons/vsc'
import {Component} from 'react'
import Header from '../Header'
import './index.css'

import JobSkill from '../JobSkill'
import SimilarJobsItem from '../SimilarJobsItem'

const profileStatus = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetailsRoute extends Component {
  state = {
    jobDetails: {},
    jobSkills: [],
    similarJobs: [],
    apiStatus: profileStatus.initial,
  }

  componentDidMount() {
    this.getJobItem()
  }

  getJobItem = async () => {
    this.setState({apiStatus: profileStatus.inprogress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const jobItemUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(jobItemUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const eachItem = data.job_details
      const similarJobs = data.similar_jobs

      const updatedJobItemData = {
        companyLogoUrl: eachItem.company_logo_url,
        companyWebsiteUrl: eachItem.company_website_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
        id: eachItem.id,
        description: eachItem.life_at_company.description,
        imageUrl: eachItem.life_at_company.image_url,
      }
      const updateSkills = eachItem.skills.map(eachSkill => ({
        name: eachSkill.name,
        imageUrl: eachSkill.image_url,
      }))
      const updatedSimilarJobs = similarJobs.map(eachSimilar => ({
        companyLogoUrl: eachSimilar.company_logo_url,
        employmentType: eachSimilar.employment_type,
        jobDescription: eachSimilar.job_description,
        location: eachSimilar.location,
        id: eachSimilar.id,
        rating: eachSimilar.rating,
        title: eachSimilar.title,
      }))
      this.setState({
        jobDetails: updatedJobItemData,
        jobSkills: updateSkills,
        similarJobs: updatedSimilarJobs,
        apiStatus: profileStatus.success,
      })
    } else {
      this.setState({apiStatus: profileStatus.failure})
    }
  }

  successViews = () => {
    const {jobDetails, similarJobs, jobSkills} = this.state

    return (
      <div className="job-item-container">
        <div className="job-item-bottom-container">
          <div className="list-item">
            <div className="image-container">
              <img
                src={jobDetails.companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div className="company-name-container">
                <h1 className="title">{jobDetails.title}</h1>
                <div className="star-container">
                  <BsStarFill className="star" />
                  <p className="rating">{jobDetails.rating}</p>
                </div>
              </div>
            </div>
            <div className="package-container">
              <div className="location-main-container">
                <div className="location-container">
                  <VscLocation className="location" />
                  <p className="location-name">{jobDetails.location}</p>
                </div>
                <div className="location-container">
                  <BsFillBagFill className="location" />
                  <p className="location-name">{jobDetails.employmentType}</p>
                </div>
              </div>
              <p className="package">{jobDetails.packagePerAnnum}</p>
            </div>
            <hr className=" hr-two" />
            <div className="desciption-container">
              <div className="visit-container">
                <h1 className="title-three">Description</h1>
                <div className="visit-icon-container">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={jobDetails.companyWebsiteUrl}
                    className="visit"
                  >
                    Visit
                  </a>
                  <HiExternalLink className="visit" />
                </div>
              </div>
              <p className="description-two">{jobDetails.jobDescription}</p>
            </div>
          </div>
          <ul className="skills-ul-container">
            <h1 className="skills-heading-new">Skills</h1>
            <div className="skills-ul-container-two">
              {jobSkills.map(eachSkill => (
                <JobSkill skillsItem={eachSkill} key={eachSkill.name} />
              ))}
            </div>
          </ul>
          <div className="life-at-company-container">
            <h1 className="skills-heading-new">Life at Company</h1>
            <div className="skills-main-container">
              <p className="description-two">{jobDetails.description}</p>
              <img
                src={jobDetails.imageUrl}
                alt="life at company"
                className="life-image"
              />
            </div>
          </div>
        </div>
        <div className="similar-container">
          <h1 className="title-three">Similar Jobs</h1>
          <ul className="job-item-similar-container">
            {similarJobs.map(similarItem => (
              <SimilarJobsItem getItem={similarItem} key={similarItem.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  inprogressViews = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  initiateJobs = () => {
    this.getJobItem()
  }

  failureViews = () => (
    <div className="jobs-fail-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="oops">Oops! Something Went Wrong</h1>
      <p className="weCannot">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry" onClick={this.initiateJobs}>
        Retry
      </button>
    </div>
  )

  renderComponents = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case profileStatus.success:
        return this.successViews()
      case profileStatus.inprogress:
        return this.inprogressViews()
      case profileStatus.failure:
        return this.failureViews()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-container">
        <Header />
        {this.renderComponents()}
      </div>
    )
  }
}

export default JobItemDetailsRoute
