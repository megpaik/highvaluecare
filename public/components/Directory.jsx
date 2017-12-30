import React from 'react';
import { connect } from 'react-redux';
import { navLanding } from '../actions/index.js'
import Study from './Study';

class DirectoryView extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const studiesArr = Object.keys(this.props.studies).map((key, i) => {
      return <Study data={this.props.studies[key]} key={i}/>;
    });
    return (
      <div>
        <button onClick={this.props.onClick}>Back</button>
        {studiesArr}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    studies: state.studies
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => { dispatch(navLanding()); }
  }
}
const Directory = connect(mapStateToProps, mapDispatchToProps)(DirectoryView);

export default Directory;