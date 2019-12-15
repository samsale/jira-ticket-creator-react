import React from 'react';
import Tag from 'react-bulma-components/lib/components/tag';

class SelectTicketsTags extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
      };
    }

  createTags = () => {
    const {data, ticketSelected} = this.props
    let tags = []
    for (const ticket of data) {
      if (ticket.isSelected){
        tags.push(<Tag onClick={(event) => ticketSelected(event, "remove")}
                  id={ticket.template}
                  key={ticket.template}
                  className="is-medium noselect"
                  color="info">
                  {ticket.name}
                  </Tag>)
      } else {
        tags.push(<Tag onClick={(event) => ticketSelected(event, "add")}
                  id={ticket.template}
                  key={ticket.template}
                  className="is-medium noselect">
                  {ticket.name}
                  </Tag>)
      }
    }
    return tags
  }

  render () {
    return(
      <Tag.Group>
        {this.createTags()}
      </Tag.Group>
    )
  }
}

export default SelectTicketsTags;
