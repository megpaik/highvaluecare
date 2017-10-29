// CIS 197 - React HW

import React from 'react';
import * as actions from '../actions/index.js';

export default class Cell extends React.Component {

  constructor() {
    super();
    this.onCellClick = this.onCellClick.bind(this);
  }

  onCellClick() {
    this.props.store.dispatch(actions.cellClicked(this.props.index));
  }

  render() {
    if (this.props.alive) {
      return (<span className="cell-component cell alive"
        onClick={this.onCellClick}></span>);
    } else {
      return (<span className="cell-component cell"
        onClick={this.onCellClick}></span>);
    }
  }
}

Cell.defaultProps = {
  alive: false,
  key: 0,
  index: 0
};
