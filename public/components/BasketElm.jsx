import React from 'react';
import * as actions from '../actions/index.js';
import * as initialState from '../initialState';

export default class BasketElm extends React.Component {

    constructor() {
        super();
        this.state = initialState;
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete() {
        this.props.store.dispatch(actions.deleteElm(this.props.key));
    }

    componentDidMount() {
      this.props.store.subscribe(function () {
        this.setState(this.props.store.getState());
      }.bind(this));
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
