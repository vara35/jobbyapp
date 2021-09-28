import './index.css'

const EmploymentType = props => {
  const {EmployItem, addEmployTypeFun} = props

  const addEmployType = () => {
    addEmployTypeFun(EmployItem.employmentTypeId)
  }

  return (
    <li className="list-employItem">
      <input
        type="checkbox"
        id={EmployItem.employmentTypeId}
        onClick={addEmployType}
      />
      <label htmlFor={EmployItem.employmentTypeId} className="checkboxItem">
        {EmployItem.label}
      </label>
    </li>
  )
}

export default EmploymentType
