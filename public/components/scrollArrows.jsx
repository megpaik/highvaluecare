import React from 'react';
import * as actions from '../actions/index.js';

export default class ScrollArrows extends React.Component {

  constructor() {
    super();
    this.onScroll = this.onScroll.bind(this);
  }

  onScroll() {
    const click = this.props.left ? actions.clickLeft : actions.clickRight;
    this.props.store.dispatch(click);
  }

  render() {
    const direction = this.props.left ? "Left" : "Right";
    return (
      <button className="arrow" onClick={this.onScroll}>{direction}</button>
    )
  }
}
