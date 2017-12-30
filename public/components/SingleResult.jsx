import React from 'react';
import { connect } from 'react-redux';
import { choose } from '../actions/index.js';

class SingleResultView extends React.Component {

    constructor(props) {
        super(props);
    }

    onClick() {
        this.props.store.dispatch(actions.choose(this.props.key));
    }

    render() {
        const index = this.props.key;
        const study = this.state.studies[index];
        const heading = study.name;
        return (
            <div className="item" onClick={this.onResultClick}>{heading}</div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => { dispatch(choose(key)); }
    }
}

const SingleResult = connect(null, mapDispatchToProps)(SingleResultView);

export default SingleResult;