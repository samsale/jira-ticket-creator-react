import React from 'react'
import Select from 'react-select';


const style = {
  control: (base, state) => ({
    ...base,
    borderColor:"#dedede",
    '&:hover': { borderColor: 'gray' }, // border style on hover
      border: '1px solid #dedede', // default border color
      boxShadow: 'none', // no box-shadow
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#03a9e2' : ''
  })
};

export class SearchProject extends React.Component {

   onChange = (event) => {
    this.props.handleChange(event, this.props.stateToUpdate)
  }

  render() {
    return (
      <div className="field">
        <div className="label">Project</div>
          <Select
            value={this.props.data.find(option => option.value === this.props.selected)}
            styles={style}
            onChange={this.onChange}
            options={this.props.data}
            placeholder={"Search for a Project"}
            components={{
              IndicatorSeparator: () => null
              }}
            />
      </div>
    );
  }
}

SearchProject.defaultProps = {
    data:[]
}
