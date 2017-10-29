// CIS 197 - React HW

import _ from 'lodash';
import React from 'react';
import Cell from './Cell';
import * as initialState from '../initialState.js';
import * as actions from '../actions/index.js';


export default class GameOfLife extends React.Component {
  // Here we subscribe to changes in the store data and update
  // the React component's state by using `store.getState()`.
  // Technically this is non-standard architecture, but we need to
  // organize things this way for the sake of the game's performance.
  // NOTE: further down in the render function, you will need to
  //       access this.state.cells and this.state.x and this.state.y.
  //       For these attributes, be sure to use this.state and not this.props
  constructor() {
    super();
    this.state = initialState;
    this.onImportSeed = this.onImportSeed.bind(this);
    this.onRun = this.onRun.bind(this);
    this.onStep = this.onStep.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onExportMap = this.onExportMap.bind(this);
    this.onRandomSeed = this.onRandomSeed.bind(this);
  }

  componentDidMount() {
    this.props.store.subscribe(function () {
      this.setState(this.props.store.getState());
    }.bind(this));
  }

  onImportSeed(seedName) {
    this.props.store.dispatch(actions.importSeed(seedName));
  }

  onRun() {
    this.props.store.dispatch(actions.run());
  }

  onStep() {
    this.props.store.dispatch(actions.step());
  }

  onStop() {
    this.props.store.dispatch(actions.stop());
  }

  onClear() {
    this.props.store.dispatch(actions.clear());
  }

  onExportMap() {
    this.props.store.dispatch(actions.exportMap());
  }

  onRandomSeed() {
    this.props.store.dispatch(actions.randomSeed());
  }

  render() {
    const cellArray = this.state.cells.map((alive, index) => {
      return <span className={'cell-widget cell' + (this.state.cells[index] ? ' alive' : '')} key={index}>
        <Cell alive={this.state.cells[index]} index={index} key={index} store = {this.props.store}/>
      </span>;
    });

    const controls =
    <div className='controls'>
      <h4>Controls</h4>
      <button onClick={this.onRun}>run</button>
      <button onClick={this.onStep}>step</button>
      <button onClick={this.onStop}>stop</button>
      <button onClick={this.onClear}>clear</button>
      <button onClick={this.onExportMap}>export map</button>
    </div>;

    const seeds =
    <div className='seeds'>
      <button onClick={() => this.onImportSeed('GLIDER')}>glider</button>
      <button onClick={() => this.onImportSeed('GLIDER_GUN')}>glider gun</button>
      <button onClick={() => this.onImportSeed('ACORN')}>acorn</button>
      <button onClick={() => this.onImportSeed('LINE')}>line</button>
      <button onClick={this.onRandomSeed}>random</button>
    </div>;

    return (
      <div className='game-component'>
        <div className='board-component' style={{width: 12 * this.state.x + 'px'}}>
          {cellArray}
        </div>
        {controls}
        {seeds}
      </div>
    );
  }
}



// TODO: here you'll want to implement the functions that get called
//       when various actions (such as button clicks) occur in thie view.
//       These functions should, like onImportSeed above, dispatch the
//       appropriate actions using the Redux store prop.

// TODO: Generate the following HTML structure:
// <div class="game-component">
//   <div class="board-component" style="width=900px">
//     <span class="cell-widget cell"></span>
//     <span class="cell-widget cell"></span>
//     <span class="cell-widget cell alive "></span>
//      ...remaining cells
//   </div>
//   <div class="controls">
//     <h4>Controls</h4>
//     <button>run</button>
//     <button>step</button>
//     <button>stop</button>
//     <button>clear</button>
//     <button>export map</button>
//   </div>
//   <div class="seeds">
//     <button>glider</button>
//     <button>glider gun</button>
//     <button>acorn</button>
//     <button>line</button>
//     <button>random</button>
//   </div>
// </div>
//
// HINT: Use the `onClick` prop on your buttons to register click callbacks!
// NOTE: Please make sure your button text matches the button text above,
//       as this is necessary for the test suite.
//       (e.g. your 'step' button should have button text 'step',
//        and your 'glider gun' button should have button text 'glider gun')
// HINT: Remember to pass the store as a prop of each <Cell> component
// HINT: Remember that the application state's `x`, `y`, and `cells` values
//       are located in this.state and not this.props.
