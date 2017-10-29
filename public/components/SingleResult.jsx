import React from 'react';
import * as actions from '../actions/index.js';

export default class SingleResult extends React.Component {
    
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.store.dispatch(actions.choose(this.props.key));
    }

    render() {
        const index = this.props.key;
        const heading = this.state.studies[index].name;
        return (
            <div className="item" onClick={onResultClick}>{heading}</div>
        );
    }
}