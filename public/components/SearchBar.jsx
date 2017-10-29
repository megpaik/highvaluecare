import React from 'react';
import * as actions from '../actions/index.js';

export default class Search extends React.Component {

    constructor() {
        super();
        this.onSearchClick = this.onSearchClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.props.store.dispatch(actions.searchView(e.target.value));
    }

    onSearchClick() {
        this.props.store.dispatch(actions.search(this.state.query));
    }

    render() {
        const query = this.state.query;
        return (
            <div>
                <input className="searchtop" value={query} onChange={this.onChange}></input>
                <button className="newsearch" onClick={this.onSearchClick}>Submit</button>
            </div>);
    }

}