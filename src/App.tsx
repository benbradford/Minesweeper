import * as React from 'react';
import './App.css';
import GridView from './View/GridView'

class App extends React.Component {

  public render(): JSX.Element {
    return (
      <div className="App">
        <header className="App-header">
          
          <h1 className="App-title">Mine Sweeper</h1>
        </header>
        <p className="App-intro">          
           <GridView />
        </p>
       
      </div>
    );
  }

  
/*
  private render_cells(): JSX.Element {
    const rows = this.props.data;
    return ( <table className="center">{rows.map((row: ICellView[]) => this.render_row(row))}</table> );
  }

  private render_row(row: Readonly<ICellView[]>): JSX.Element {
    return (<tr className="Row">{row.map((c: Readonly<ICellView>) => this.render_cell(c) )}</tr>);
  }

  private render_cell(cell: Readonly<ICellView>): JSX.Element {
    if (cell.revealed === false) {
      const callback = () =>{ this.reveal(cell); };
      return (<td className="Cell Hidden"><button onClick={callback}/></td>);
    }
    let content = "" + cell.content;
    if (cell.content === 0) {
      content = " ";
    } else if (cell.content === Content.mine) {
      content = "M";
    }
    
  return (<td className="Cell Reveal">{content}</td>);
  }
*/
/*
  private update() {
    if (this.game.tick()) {
      this.setState({});
    }
  }

  private resetClicked = () => {
    this.reset();
    this.setState({});
  }

  private reset() {
   this.game.request_reset();
  }
*/
 
}

export default App;
