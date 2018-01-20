import React from 'react';
import { connect } from 'react-redux';
import { deleteElm } from '../actions/index.js';

class BasketElmView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const target = this.props.data;
        console.log(target);
        return (
            <div className="fullview">
                <div className="details">
                Testing
                    <span className="name">{target.name}</span>
                    <span className="cpt">{target.CPT}</span>
                    <span className="diagnosis">{target["Intended Diagnosis"]}</span>
                    <span className="sensitivity">{target.Sensitivity}</span>
                    <span className="specificity">{target.Specificity}</span>
                    <span className="PPV">{target.PPV}</span>
                    <span className="NPV">{target.NPV}</span>
                    <span className="comments">{target.comments}</span>
                </div>
                <button className="trash" onClick={this.props.onDelete}>Trash</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onDelete: () => { dispatch(deleteElm(Object.keys(ownProps.data)[0])); }
    }
}

const BasketElm = connect(null, mapDispatchToProps)(BasketElmView);

export default BasketElm;