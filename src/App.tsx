import * as React from 'react';
import './App.css';
import GridView from './View/GridView'
import Game from './ViewModel/Game'
import {ICellData} from './ViewModel/ICellData'

interface IAppState {
    cells: ICellData[][];
    flagModeOn: boolean;
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
        const flagMode = () => {this.flag_mode_clicked()};
        let flagText = "Pick";
        if (this.state.flagModeOn) {
            flagText = "Flag";
        }
        return (
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Mine Sweeper</h1>
              <button onClick={reset}>Reset</button>
              <button onClick={flagMode}>{flagText}</button>
            </header>
            <p className="App-intro">          
              <GridView game={this.game} onClick={onCellClick} cells={this.state.cells}/>
            </p>      
          </div>
        );
    }

    private update() {
        if (this.game.tick()) {
            this.refresh_state();
        }
    }

    private on_click(row: number, column: number) {
        if (this.game.click(row, column)) {
            this.refresh_state();
        }
    }

    private request_reset() {
        if (this.game.request_reset()) {
            this.refresh_state();
        }
    }

    private flag_mode_clicked() {
        this.game.toggle_flag_mode();
        this.refresh_state();
    }

    private refresh_state() {
        this.setState({cells: this.game.sync(), flagModeOn: this.game.is_flag_mode_on()});
    }

}

export default App;
