import React, { Component } from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Dropdown, Columns } from 'react-bulma-components';



class DropDownComponent extends Component {
    state = {
      selected: '',
      selectedVersion:'',
      versionsDropdown:[]
    }



    onChange = (selected) => {
      this.setState({ selected });

    }
    onChangeVersion = (selectedVersion) => {
      this.setState({ selectedVersion });

    }

    getVersionsFromJira = async (selected) => {
      if(this.state.selected.name !== "-- Select Project --"){
        let projectId = selected.id
        let response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${projectId}`)
        let jsonData = await response.json()
        await this.setState({
          versionsDropdown:
            jsonData
        })
      }else{
        await this.setState({versionsDropdown: []})
      }
    }

    testFunction = async (selected) => {
    await this.onChange(selected);
    await this.props.getSelectedProject(selected)
    await this.getVersionsFromJira(selected);
    await this.props.test(selected, "project")
}


    render() {
      return (
        <>
        <Columns>
          <Columns.Column size={3}>
            <Dropdown
              value={this.state.selected}
              onChange={this.testFunction}
              color="light"
              label={('label', '')}
              name="sam"
              >
              {this.props.projects.map((project, index) => {
                return(
                <Dropdown.Item value={project} key={index}>
                  {project.name}
                </Dropdown.Item>
                )
              })}
            </Dropdown>
          </Columns.Column>
          <Columns.Column >
          {this.state.versionsDropdown.length > 0 &&
            <Dropdown
              value={this.state.versionsDropdown}
              color="light"
              label={('label', '')}
              onChange={this.props.test}
              >
              {this.state.versionsDropdown.map((version, index) => {
                return(
                <Dropdown.Item value={version} key={index}>
                  {version.title}
                </Dropdown.Item>
                )
              })}
            </Dropdown>
          }
          </Columns.Column>
        </Columns>
        </>
      );
    }
  }

export default DropDownComponent;
