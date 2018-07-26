import * as React from 'react';
import './App.css';
import GridView from './View/GridView'
import Game from './ViewModel/Game'
import {ICellViewData} from './ViewModel/ICellViewData'
import FaceView from './View/FaceView'
import {GameStateType} from './ViewModel/GameStateType'

interface IAppState {
    cells: ICellViewData[][];
    flagModeOn: boolean;
    stateType: GameStateType
}

class App extends React.Component<any, IAppState> {

    private interval: NodeJS.Timer;
    private game = new Game;

    public componentDidMount() {
        this.interval = setInterval(() => this.update(), 1);
        this.setState({cells: this.game.sync()});
        const refreshState = () => { this.refresh_state() };
        this.game.set_sync_callback(refreshState);
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

                <table className="center" >
                    <tr><td/><td>
                        <FaceView stateType={this.state.stateType} />
                    </td></tr>
                    <tr> 
                        <td><button onClick={reset}>Reset</button></td>
                        <td/>
                        <td><button onClick={flagMode}>{flagText}</button></td>
                    </tr>
                </table>
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
        const c = this.game.sync();
        const f = this.game.is_flag_mode_on();
        const s = this.game.state();
        this.setState({cells: c, flagModeOn: f, stateType: s});
    }

}

export default App;
