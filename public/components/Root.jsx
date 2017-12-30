import React from 'react';
import { connect } from 'react-redux';
import LandingPage from './LandingPage';
import Directory from './Directory';
import SearchPage from './SearchPage';
// import ComparePage from './ComparePage';

class RootView extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    let currPage = null;
    if (this.props.active === 'DIRECTORY') currPage = <Directory />;
    else if (this.props.active === 'SEARCH') currPage = <SearchPage />;
    // else if (this.props.active === 'COMPARE') currPage = <ComparePage />;
    else currPage = <LandingPage />;

    return (
      <div>
        {currPage}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    active: state.active
  }
}

const Root = connect(mapStateToProps)(RootView);

export default Root;