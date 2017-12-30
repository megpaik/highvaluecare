import React from 'react';
import { connect } from 'react-redux';
import SingleResult from './SingleResult'

class SearchResultsView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const arr = this.props.matches.map((elt, i) => {
            return (<span className='searchitem'>
                        <SingleResult data={elt} />
                    </span>);
        })

        return (
            <div className="searchresults">{arr}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        matches: this.matches
    }
}

const SearchResults = connect(mapStateToProps)(SearchResultsView);

export default SearchResults;