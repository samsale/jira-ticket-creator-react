import React from 'react';
import './index.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container, Section, Columns, Box } from 'react-bulma-components';
import Header from './components/header.js'
import VersionDropDownVersion from './components/versionDropDown.js'
import {SearchProject} from './components/searchProject.js'
import SelectTicketsTags from './components/selectTicketsTags.js'
import User from './components/user.js'
import NextButton from './components/nextButton.js'
import Templates from './config/issues.js';
import ProjectsJson from './config/projects.json';


class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        projects: undefined,
        versions: [],
        selectedProject: undefined,
        selectedVersion: undefined,
        selectedTickets: [],
        selectedAssignee: undefined,
        templateTickets: [],
        canSubmit: false
      };
    }

  // getProjects = async () => {
  //   let response = await fetch('https://jsonplaceholder.typicode.com/users')
  //   let jsonData = await response.json()
  //   // await this.setState([...this.state.projects, jsonData])
  //   await this.setState({
  //     projects: [
  //       ...this.state.projects,
  //       ...jsonData
  //     ]
  //   })
  // }

  createTicketsForSelection = () => {
    const { templateTickets } = this.state
    const newArray = templateTickets.map(ticket => ({...ticket, isSelected: false}))
    this.setState({ selectedTickets : newArray})

  }
  clearVersions = () =>{
    this.setState({selectedVersion: null})
    this.setState({selectedAssignee:""})
  }

  getVersions = async () => {
    if(this.state.selectedProject !== null){
      let id = this.state.selectedProject.id
      let response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      let jsonData = await response.json()
      await this.setState({
        versions:
          jsonData
      })
    }
  }

  createProjectDataforDropDown = (arrayOfProjects) => {
    let dropDownData =[]
    for (let project of arrayOfProjects) {
      let newObject = { value: project.name,
                        label: project.name,
                        key: project.key
                      }
      dropDownData.push(newObject)
    }
    this.setState({projects: dropDownData})
  }

  handleChange =  async (event, selectedElement) => {
    await this.setState({[selectedElement]:event})
    await this.canSubmit()
  }

  ticketSelected = ( event, action ) => {
    const { selectedTickets } = this.state
    const newArray = selectedTickets.slice() //copy the array
    const objIndex = newArray.findIndex((ticket => ticket.template === event.target.id));
    if (action === "remove") {
      newArray[objIndex].isSelected = false
    } else {
      newArray[objIndex].isSelected = true
    }
    this.setState({selectedTickets: newArray})
  }

  componentDidMount = () => {
    this.setState({templateTickets:Templates}, () => this.createTicketsForSelection())
    this.setState({test:ProjectsJson},()=> this.createProjectDataforDropDown(this.state.test))
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedProject !== prevState.selectedProject) {
      this.getVersions();
    }
  }

  canSubmit = () => {
    const { selectedProject,
            selectedVersion,
            selectedTickets,
            selectedAssignee } = this.state;
    if (!selectedProject || !selectedAssignee ||  selectedTickets.length <=0 ||
        !selectedVersion) {
      this.setState({canSubmit:false})
    } else {
      this.setState({canSubmit:true})
    }
  }

  render() {
    return (
      <>
        <Container>
          <Section>
            <Box>
              <Columns>
                <Columns.Column>
                  <SearchProject  handleChange={this.handleChange}
                                  data={this.state.projects}
                                  selected={this.state.selectedProject}
                                  stateToUpdate="selectedProject"/>
                </Columns.Column>
                <Columns.Column>
                  <VersionDropDownVersion handleChange={this.handleChange}
                                          data={this.state.versions}
                                          selected={this.state.selectedVersion}
                                          stateToUpdate="selectedVersion"/>
                </Columns.Column>
                <Columns.Column size={2}>
                  <User handleChange={this.handleChange}
                        stateToUpdate="selectedAssignee"
                        value={this.state.selectedAssignee}
                        data={this.state.selectedVersion}/>
                </Columns.Column>
              </Columns>
            </Box>
            <Box>
              <SelectTicketsTags data={this.state.selectedTickets}
                                  ticketSelected={this.ticketSelected}/>
            </Box>
              <NextButton enabled={this.state.canSubmit}/>
              <Header/>
          </Section>
        </Container>
      </>
    );
  }
}
export default App;
