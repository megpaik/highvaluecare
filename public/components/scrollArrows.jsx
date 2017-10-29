import React from 'react';
import * as actions from '../actions/index.js';

export default class scrollArrows extends React.Component {

  constructor() {
    super();
  }

  onScroll() {
    const direction = this.props.left ? actions.clickLeft : actions.clickRight;
    this.props.store.dispatch(direction);
  }

  render() {
    const direction = this.props.left ? "Left" : "Right"; 
    return (
      <button className="arrow" onClick={this.onScroll}>{direction}</button>
    )
  }
}