import React from 'react';
import * as actions from '../actions/index.js';
import * as initialState from '../initialState';

export default class SearchBar extends React.Component {

    constructor() {
        super();
        this.state = initialState;
        this.onSearchClick = this.onSearchClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
      this.props.store.subscribe(function () {
        this.setState(this.props.store.getState());
      }.bind(this));
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
