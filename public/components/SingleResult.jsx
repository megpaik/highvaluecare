import React from 'react';
import { connect } from 'react-redux';
import { choose } from '../actions/index.js';

class SingleResultView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="item" onClick={this.props.onClick}>
                {this.props.data.name}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => { console.log(ownProps.data); dispatch(choose(Object.keys(ownProps.data)[0])); }
    }
}

const SingleResult = connect(null, mapDispatchToProps)(SingleResultView);

export default SingleResult;