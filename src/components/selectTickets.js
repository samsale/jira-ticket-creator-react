import React from 'react'
import Table from 'react-bulma-components/lib/components/table';
import Button from 'react-bulma-components/lib/components/button';

class SelectTickets extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        confiugration:[],
      };
    }

  buttonClick = (event, status) => {
    const newArray = this.state.confiugration.slice() //copy the array
    let foundIndex = newArray.findIndex(x => x.template === event.target.id);
    let foundObject = newArray.find( ({ template }) => template === event.target.id );
    foundObject["added"] = (status === "add") ? true : false;
    newArray[foundIndex] = foundObject
    this.setState({confiugration:newArray})
  }


  static getDerivedStateFromProps(props, state){
    if (props.data !== state.confiugration) {
       return {
      confiugration: props.data
      }
    }
    return null;
  }

  selectedIssues =() => {
    const { confiugration } = this.state;
    let filteredArray = confiugration.filter( ticket => ticket.added === true ).map( obj => obj );
    this.props.handleChange(filteredArray,this.props.stateToUpdate)
  }


  componentDidUpdate(prevProps, prevState, snapshot){
    if (prevState !== this.state){
      this.selectedIssues()
    }
  }

  createTable = () => {
    return(
      <>
        <Table className="is-fullwidth">
          <thead>
            <tr>
              <th className="has-text-centered"></th>
              <th>Title</th>
              <th className="column-width"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.confiugration.map((issue, index) =>
              issue.added ? (
                <tr key={index} className="is-selected">
                  <td className="has-text-centered"><Button id={issue.template} onClick={(event) => this.buttonClick(event, "remove")}>-</Button></td>
                  <td>{issue.name}</td>
                  <td></td>
                </tr>)
              :(
                <tr key={index}>
                  <td className="has-text-centered"><Button id={issue.template} onClick={(event) => this.buttonClick(event, "add")}>+</Button></td>
                  <td>{issue.name}</td>
                  <td></td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </>
    )}

  render() {

    return (
      this.createTable()
    )
  }
}


export default SelectTickets

SelectTickets.defaultProps = {
    data:[]
}
