import React from 'react';
import { connect } from 'react-redux';
import { navLanding, navCompare } from '../actions/index.js';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

class SearchPageView extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="searchpage">
        <button onClick={this.props.onClick}>Back</button>
        <SearchBar />
        <SearchResults />
        <button onClick={this.props.onCompare}>Compare Selected Studies</button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => { dispatch(navLanding()); },
    onCompare: () => { dispatch(navCompare()); }
  }
}

const SearchPage = connect(null, mapDispatchToProps)(SearchPageView);

export default SearchPage;