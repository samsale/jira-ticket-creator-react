import React from 'react'
import { Field, Control, Label, Input} from 'react-bulma-components/lib/components/form'


const User = (props) => {

  let onChange = (event) => {
    props.handleChange(event.target.value, props.stateToUpdate)
  }

  let textInputState = (props.data === null) ? 'is-disable' : '' ;

    return (
      <Field>
        <Label>Assignee</Label>
        <Control>
          <Input className={textInputState} onChange={onChange} name="name" type="text" placeholder="Username" value={props.value} />
        </Control>
      </Field>
    )
  }


export default User
