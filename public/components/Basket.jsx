import React from 'react';
import BasketElm from './BasketElm';
import * as actions from '../actions/index.js';

// THIS IS JUST THE CONTAINER
export default class Basket extends React.Component {

    constructor() {
        super();
    }

    render() {
        const elmarr = this.state.basket.map((elm, i) => {
            return <BasketElm index={i} key={elm} store={this.props.store} />
        })
        return (
            <div className="basket">
                <div className="leftcontainer" left={true}></div>
                <div className="baskettext">{elmarr}</div>
                <div className="rightcontainer" left={false}></div>
            </div>
        )
    }
}