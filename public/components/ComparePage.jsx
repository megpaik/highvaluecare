import React from 'react';
import { connect } from 'react-redux';
import BasketElm from './BasketElm';
import ScrollArrows from './ScrollArrows';
import { clickLeft, clickRight, navSearch } from '../actions/index.js';

class ComparePageView extends React.Component {

    constructor() {
        super();
    }

    render() {
        const elmarr = this.props.basket.map((elm, i) => {
            return <BasketElm key={i} data={elm} />
        });
        return (
            <div className="basket">
                <div className="top">
                    <button className="back" onClick={this.props.onNav}>Back</button>
                    Compare Studies
                </div>

                <div className="leftcontainer">
                    <button className="leftarrow" onClick={this.onScrollLeft}>&lt;</button>
                </div>

                <div className="baskettext">{elmarr}</div>

                <div className="rightcontainer">
                    <button className="leftarrow" onClick={this.onScrollRight}>&gt;</button>
                </div>

                <button className="footer">Add more studies</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        basket: state.basket
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onScrollLeft: () => { dispatch(clickLeft()); },
        onScrollRight: () => { dispatch(clickRight()); },
        onNav: () => { dispatch(navSearch()); }
    }
}

const ComparePage = connect(mapStateToProps, mapDispatchToProps)(ComparePageView);

export default ComparePage;