import React from 'react';
import { connect } from 'react-redux';
import { deleteElm } from '../actions/index.js';

class BasketElmView extends React.Component {

    constructor() {
        super();
    }

    onDelete() {
        this.props.store.dispatch(actions.deleteElm(this.props.key));
    }

    render() {
        // this should be the object from medicalStudies
        const target = this.state.studies[this.props.key];
        return (
            <div className="fullview">
                <div className="details">
                    <span className="name">{target.name}</span>
                    <span className="cpt">{target.CPT}</span>
                    <span className="diagnosis">{target["Intended Diagnosis"]}</span>
                    <span className="sensitivity">{target.Sensitivity}</span>
                    <span className="specificity">{target.Specificity}</span>
                    <span className="PPV">{target.PPV}</span>
                    <span className="NPV">{target.NPV}</span>
                    <span className="comments">{target.comments}</span>
                </div>
                <button className="trash" onClick={this.onDelete}>Trash</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: () => { dispatch(deleteElm()); }
    }
}

const BasketElm = connect(mapDispatchToProps)(BasketElmView);

export default BasketElm;