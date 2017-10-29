import React from 'react';
import BasketElm from './BasketElm';
import ScrollArrows from './ScrollArrows';
import * as actions from '../actions/index.js';
import * as initialState from '../initialState';

// THIS IS JUST THE CONTAINER
export default class Basket extends React.Component {

    constructor() {
        super();
        this.state = initialState;
    }

    componentDidMount() {
      this.props.store.subscribe(function () {
        this.setState(this.props.store.getState());
      }.bind(this));
    }

    render() {
        const elmarr = this.state.basket.map((elm, i) => {
            return <BasketElm index={i} key={elm} store={this.props.store} />
        })
        return (
            <div className="basket">
                <div className="leftcontainer">
                    <ScrollArrows left={true} store={this.props.store} />
                </div>
                <div className="baskettext">{elmarr}</div>
                <div className="rightcontainer">
                    <ScrollArrows left={false} store={this.props.store} />
                </div>
            </div>
        )
    }
}
