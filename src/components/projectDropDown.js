import React from 'react'
import { Dropdown } from 'react-bulma-components';

const ProjectDropDown = (props) => {

  let onChange = (event) => {
    props.handleChange(event, props.stateToUpdate)
    props.clearVersions()
  }

  return (
    <>
    <div className="field">
     <div className="label">Project</div>
        <Dropdown
          value={props.selected}
          onChange={onChange}
          color="light"
          label={('label', 'Select a Project')}
          >
          {props.data.map((item, index) => {
            return(
            <Dropdown.Item value={item} key={index}>
              {item.name}
            </Dropdown.Item>
            )
          })}
        </Dropdown>
      </div>
        </>
  )
}

export default ProjectDropDown
