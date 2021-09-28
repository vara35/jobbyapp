import './index.css'

const SalaryRange = props => {
  const {salaryItem, addSalaryTypeFun} = props

  const addSalaryType = () => {
    addSalaryTypeFun(salaryItem.salaryRangeId)
  }

  return (
    <li className="list-employItem">
      <input
        type="radio"
        id={salaryItem.salaryRangeId}
        name="salary"
        onClick={addSalaryType}
      />
      <label htmlFor={salaryItem.salaryRangeId} className="checkboxItem">
        {salaryItem.label}
      </label>
    </li>
  )
}

export default SalaryRange
