import * as React from 'react';
import './App.css';
import Grid from './Grid'
import GridInitialiser from './GridInitialiser'
import {IGridCell} from './GridCell'
import MoveSolver from './MoveSolver'

class App extends React.Component {

  private grid: Readonly<Grid>;
  private moveSolver: MoveSolver;
  private interval : NodeJS.Timer;

  constructor(props: Readonly<any>) {
    super(props);
    this.reset();
  }

  public componentDidMount() {
    this.interval = setInterval(() => this.update(), 20);
 }
 
 public  componentWillUnmount() {
     clearInterval(this.interval);
 }

  public render(): JSX.Element {
    return (
      <div className="App">
        <header className="App-header">
          
          <h1 className="App-title">M</h1>
        </header>
        <p className="App-intro">          
            {this.render_cells()}
        </p>
        <br /> <button onClick={this.resetClicked}>Reset</button>
      </div>
    );
  }

  private render_cells(): JSX.Element {
    const rows: Readonly<IGridCell[][]> = this.grid.cells();
    return ( <table className="center">{rows.map((row: IGridCell[]) => this.render_row(row))}</table> );
  }

  private render_row(row: Readonly<IGridCell[]>): JSX.Element {
    return (<tr className="Row">{row.map((c: IGridCell) => this.render_cell(c) )}</tr>);
  }

  private render_cell(cell: Readonly<IGridCell>): JSX.Element {
    if (cell.revealed === false) {
      const callback = () =>{ this.reveal(cell); };
      return (<td className="Cell Hidden"><button onClick={callback}/></td>);
    }
    let content = "" + cell.content;
    if (cell.content === 0) {
      content = " ";
    }
  return (<td className="Cell Reveal">{content}</td>);
  }

  private update() {
    const hasSteps = this.moveSolver.has_more_steps(); 
    if (hasSteps) {
      this.moveSolver.step();
      this.setState({});
    }
  }

  private resetClicked = () => {
    this.reset();
    this.setState({});
  }

  private reset() {
    const grid = new Grid(16, 16, 30);
    this.grid = grid;
    const init = new GridInitialiser(grid);
    init.populate_grid_with_mines();
    init.populate_numbers_in_grid();
    this.moveSolver = new MoveSolver(grid);
  }

  private reveal(cell: Readonly<IGridCell>) {
    this.moveSolver.make_move(cell.coords.column, cell.coords.row);
    this.setState({});
  }
}

export default App;
