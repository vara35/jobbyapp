import './index.css'

const JobSkill = props => {
  const {skillsItem} = props
  return (
    <li className="skills-list-item">
      <img
        src={skillsItem.imageUrl}
        alt={skillsItem.name}
        name={skillsItem.name}
        className="skills-image"
      />
      <h1 className="skill-heading">{skillsItem.name}</h1>
    </li>
  )
}

export default JobSkill
