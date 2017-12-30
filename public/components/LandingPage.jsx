import React from 'react';
import { connect } from 'react-redux';
import { navDirectory } from '../actions/index.js';
import SearchBar from './SearchBar';

class LandingPageView extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div id="header">highvalue.care</div>
        <SearchBar />
        <div id="seelist" onClick={this.props.onClick}>Or click here for a list of studies</div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => { dispatch(navDirectory()); }
  }
}
const LandingPage = connect(null, mapDispatchToProps)(LandingPageView);

export default LandingPage;