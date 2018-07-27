import * as React from 'react';
import './App.css';
import GridView from './View/GridView'
import TitleBarView from './View/TitleBarView'
import Game from './ViewModel/Game'
import IGameState from './ViewModel/IGameState'

class App extends React.Component<any, IGameState> {

    private interval: NodeJS.Timer;
    private game = new Game;

    public componentDidMount() {
        this.interval = setInterval(() => this.update(), 1);      
        this.game.register_state_change_listener(this.refreshState);
    }

    public  componentWillUnmount() {
        clearInterval(this.interval);
    }

    public render(): JSX.Element {
        if (this.state === null || this.state.cells === null) {
            return (<p/>);
        }
        const onCellClick = (row: number, column: number) => { this.game.click(row, column) };
        const onResetClick = () => {this.game.request_reset()};
        const onToggleFlagMode = () => {this.game.toggle_flag_mode()};
        
        return (
          <div className="App">
            <TitleBarView stateType={this.state.stateType} onResetClicked={onResetClick} onFlagModeToggle={onToggleFlagMode} isFlagModeOn={this.state.flagModeOn}/>
            <p className="App-intro">          
              <GridView game={this.game} onClick={onCellClick} cells={this.state.cells}/>
            </p>      
          </div>
        );
    }

    private update() {
        this.game.tick();      
    }

    private refreshState = (newState: IGameState): void => {
         this.setState(newState);
    }
}

export default App;
