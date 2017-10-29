import React from 'react';
import * as actions from '../actions/index.js';
import * as initialState from '../initialState';

export default class SingleResult extends React.Component {

    constructor() {
        super();
        this.state = initialState;
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
      this.props.store.subscribe(function () {
        this.setState(this.props.store.getState());
      }.bind(this));
    }

    onClick() {
        this.props.store.dispatch(actions.choose(this.props.key));
    }

    render() {
        const index = this.props.key;
        const study = this.state.studies[index];
        const heading = study.name;
        return (
            <div className="item" onClick={this.onResultClick}>{heading}</div>
        );
    }
}
