import * as React from 'react';
import './App.css';
import Grid from './Grid'
import GridInitialiser from './GridInitialiser'
import {IGridCell, Content} from './GridCell'

import logo from './logo.svg';

class App extends React.Component {

  private grid: Grid;
  private gridInitialiser: GridInitialiser;

  constructor(props: Readonly<any>) {
    super(props);
    this.gridInitialiser = new GridInitialiser(this.numberSetter, this.mineSetter);
    this.grid = new Grid(8, 8, 6, this.gridInitialiser);
    
  }
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
            {this.render_cells()}
        </p>
      </div>
    );
  }

  private render_cells() {
    const rows = this.grid.cells();
    return ( <section>{rows.map((row: Readonly<IGridCell[]>) =>{this.render_row(row)})} </section> );
  }

  private render_row(row: Readonly<IGridCell[]>) {
    return (<section>{row.map((cell: Readonly<IGridCell>) => {this.render_cell(cell);})} </section>);
  }

  private render_cell(cell: Readonly<IGridCell>) {
    return (<button> B </button>);
  }

  private numberSetter = (x: number, y: number, num: number) => {
    this.grid.guaranteed_cell(x,y).content = num;
  }

  private mineSetter = (x: number, y: number) => {
    this.grid.guaranteed_cell(x, y).content = Content.mine;
  }
}

export default App;
