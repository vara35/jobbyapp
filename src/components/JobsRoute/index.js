import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import EmploymentType from '../EmploymentType'
import SalaryRange from '../SalaryType'
import JobDescription from '../JobDescription'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const profileStatus = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const jobsStatus = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const addString = []

class JobsRoute extends Component {
  state = {
    profileData: '',
    jobsData: [],
    profileApiStatus: profileStatus.initial,
    jobsApiStatus: jobsStatus.initial,
    jobType: [],
    packageRange: '',
    search: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsDetails()
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: profileStatus.inprogress})

    const jwtToken = Cookies.get('jwt_token')

    const ProfileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(ProfileApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedProfileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileData: updatedProfileData,
        profileApiStatus: profileStatus.success,
      })
    } else {
      this.setState({profileApiStatus: profileStatus.failure})
    }
  }

  getJobsDetails = async () => {
    this.setState({jobsApiStatus: jobsStatus.inprogress})
    const {jobType, packageRange, search} = this.state

    const jwtToken = Cookies.get('jwt_token')

    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${jobType}&minimum_package=${packageRange}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedJobsData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        id: eachJob.id,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobsData: updatedJobsData,
        jobsApiStatus: jobsStatus.success,
      })
    } else {
      this.setState({jobsApiStatus: jobsStatus.failure})
    }
  }

  profileDetails = () => {
    const {profileData} = this.state

    return (
      <div className="profile-container-first">
        <img
          src={profileData.profileImageUrl}
          alt="profile"
          className="profile"
        />
        <h1 className="profileName">{profileData.name}</h1>
        <p className="profileShortBio">{profileData.shortBio}</p>
      </div>
    )
  }

  profileInprogress = () => (
    <div className="loader-container-first" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  initiateProfile = () => {
    this.getProfileDetails()
  }

  initiateJobs = () => {
    this.getJobsDetails()
  }

  profileFailure = () => (
    <div className="fail-container">
      <button type="button" className="retry" onClick={this.initiateProfile}>
        Retry
      </button>
    </div>
  )

  profileComponent = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case profileStatus.success:
        return this.profileDetails()
      case profileStatus.inprogress:
        return this.profileInprogress()
      case profileStatus.failure:
        return this.profileFailure()
      default:
        return null
    }
  }

  jobsDetails = () => {
    const {jobsData} = this.state
    const lengthOfList = jobsData.length
    return lengthOfList ? (
      <ul className="jobs-ul-list">
        {jobsData.map(eachJob => (
          <JobDescription jobItem={eachJob} key={eachJob.id} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="noJobs"
        />
        <h1 className="noJob">No Jobs Found</h1>
        <p className="CannotFind">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  jobsInprogress = () => (
    <div className="jobs-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  jobsFailure = () => (
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

  jobsComponent = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case jobsStatus.success:
        return this.jobsDetails()
      case jobsStatus.inprogress:
        return this.jobsInprogress()
      case jobsStatus.failure:
        return this.jobsFailure()
      default:
        return null
    }
  }

  addEmployTypeFun = employmentTypeId => {
    addString.push(employmentTypeId)
    const joining = addString.join()
    this.setState({jobType: joining}, this.getJobsDetails)
  }

  addSalaryTypeFun = salaryTypeId => {
    this.setState({packageRange: salaryTypeId}, this.getJobsDetails)
  }

  updateSearch = event => {
    this.setState({search: event.target.value})
  }

  initiateSearch = () => {
    this.setState({jobType: '', packageRange: ''}, this.getJobsDetails)
  }

  render() {
    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-bottom-container">
          <div className="jobs-user-container">
            {this.profileComponent()}

            <hr className="hr-line" />
            <ul className="employment-type">
              <h1 className="typeOfEmployment">Type of Employment</h1>
              {employmentTypesList.map(eachType => (
                <EmploymentType
                  EmployItem={eachType}
                  addEmployTypeFun={this.addEmployTypeFun}
                  key={eachType.employmentTypeId}
                />
              ))}
            </ul>
            <hr className="hr-line" />
            <ul className="employment-salary">
              <h1 className="typeOfEmployment">Salary Range</h1>
              {salaryRangesList.map(eachType => (
                <SalaryRange
                  salaryItem={eachType}
                  addSalaryTypeFun={this.addSalaryTypeFun}
                  key={eachType.salaryRangeId}
                />
              ))}
            </ul>
          </div>
          <div className="jobs-details-container">
            <div className="search-container">
              <input
                type="search"
                className="search-bar"
                placeholder="Search"
                onChange={this.updateSearch}
              />
              <button
                type="button"
                testid="searchButton"
                className="icon-container"
                onClick={this.initiateSearch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.jobsComponent()}
          </div>
        </div>
      </div>
    )
  }
}
export default JobsRoute
