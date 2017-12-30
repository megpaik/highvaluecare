import React from 'react';
import { connect } from 'react-redux';
import { search, searchView } from '../actions/index.js';

class SearchBarView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="searchcontainer">
                <input id="mainsearch" className="searchbar" placeholder="Search for a study..." value={this.props.query} onChange={this.props.onChange}></input>
                <button id="submit" onClick={this.props.onSearchClick}></button>
            </div>);
    }

}

const mapStateToProps = (state) => {
    return {
        query: state.query
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: (e) => { dispatch(searchView(e.target.value)); },
        onSearchClick: () => { dispatch(search(ownProps.query)); }
    }
}

const SearchBar = connect(mapStateToProps, mapDispatchToProps)(SearchBarView);

export default SearchBar;