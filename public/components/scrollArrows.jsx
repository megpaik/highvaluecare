import React from 'react';
import * as actions from '../actions/index.js';

export default class ScrollArrows extends React.Component {

  constructor() {
    super();
    this.onScroll = this.onScroll.bind(this);
  }

  onScroll() {
    if (this.props.left) this.props.store.dispatch(actions.clickLeft())
    else this.props.store.dispatch(actions.clickRight());
  }

  render() {
    const direction = this.props.left ? "Left" : "Right";
    return (
      <button className="arrow" onClick={this.onScroll}>{direction}</button>
    )
  }
}
