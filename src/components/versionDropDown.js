import React from 'react'
import { Dropdown } from 'react-bulma-components';

const VersionDropDownVersion = (props) => {

  let onChange = (event) => {
    props.handleChange(event, props.stateToUpdate)
  }

  let dropDownState = (props.data.length === 0) ? 'is-disable' : '' ;

  return (
    <>
    <div className="field">
     <div className="label">Version</div>

        <Dropdown
        className={dropDownState}
          value={props.selected}
          onChange={onChange}
          color="light"
          label={('label', 'Select a Version')}
          >
          {props.data.map((item, index) => {
            return(
            <Dropdown.Item value={item} key={index}>
              {item.title}
            </Dropdown.Item>
            )
          })}
        </Dropdown>
      </div>
        </>
  )
}

export default VersionDropDownVersion
