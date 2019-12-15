import React from 'react'
import Button from 'react-bulma-components/lib/components/button';

const NextButton = (props) => {
    return (
      <div className="buttons has-addons is-centered">
        <Button color={"light"} inverted={false} disabled={!props.enabled}>Submit</Button>
      </div>
)

  }

export default NextButton
