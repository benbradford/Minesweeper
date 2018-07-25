import * as React from 'react';
import './App.css';
import GridView from './View/GridView'
import Game from './ModelView/Game'
import {ICellData} from './ModelView/ICellData'

interface IAppState {
    cells: ICellData[][];
}

class App extends React.Component<any, IAppState> {

    private interval: NodeJS.Timer;
    private game = new Game;

    public componentDidMount() {
        this.interval = setInterval(() => this.update(), 1);
        this.setState({cells: this.game.sync()});
    }

    public  componentWillUnmount() {
        clearInterval(this.interval);
    }

    public render(): JSX.Element {
        if (this.state === null || this.state.cells === null) {
            return (<p/>);
        }
        const onCellClick = (row: number, column: number) => { this.on_click(row, column)};
        const reset = () => {this.request_reset()};
        return (
          <div className="App">
            <header className="App-header">
            
              <h1 className="App-title">Mine Sweeper</h1>

              <button onClick={reset}>Reset</button>
            </header>
            <p className="App-intro">          
              <GridView game={this.game} onClick={onCellClick} cells={this.state.cells}/>
            </p>      
          </div>
        );
    }

    private update() {
        if (this.game.tick()) {
            this.setState({cells: this.game.sync()});
        }
    }

    private on_click(row: number, column: number) {
        if (this.game.click(row, column)) {
            this.setState({cells: this.game.sync()});
        }
    }

    private request_reset() {
        if (this.game.request_reset()) {
            this.setState({cells: this.game.sync()});
        }
    }

}

export default App;
