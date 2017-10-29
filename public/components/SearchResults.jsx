import React from 'react';
import SingleResult from './SingleResult'
import * as actions from '../actions/index.js';
import * as initialState from '../initialState';

export default class Cell extends React.Component {

    constructor() {
        super();
        this.state = initialState;
    }

    componentDidMount() {
      this.props.store.subscribe(function () {
        this.setState(this.props.store.getState());
      }.bind(this));
    }

    render() {
        const arr = this.state.matches.map((elt, i) => {
            return <span className='item holder' key={i}>
            <SingleResult index={i} key={elt} store = {this.props.store}/>
            </span>;
        })

        return (
            <div className="searchresults">{arr}</div>
        );
    }
}
