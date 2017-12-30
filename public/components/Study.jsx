import React from 'react';

export default class Study extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="study">{this.props.data.name}
      </div>
    )
  }
}