import * as React from 'react'
import FaceView from './FaceView'
import {GameStateType} from '../ViewModel/GameStateType'
import './StyleSheet/TitleBar.css'

interface ITitleBarProps {
    stateType: GameStateType;
    onResetClicked: () => void;
    onFlagModeToggle: () => void;
    isFlagModeOn: boolean;
}

export default class TitleBarView extends React.Component<ITitleBarProps, any>{
 
    public render() { 
        return ( <header className="App-header">

                <table className="center" >
                    <tr><td/><td>
                        <FaceView stateType={this.props.stateType} />
                    </td></tr>
                    <tr> 
                        <td><button onClick={this.props.onResetClicked}>Reset</button></td>
                        <td/>
                        <td><button onClick={this.props.onFlagModeToggle}>{this.flag_button_text()}</button></td>
                    </tr>
                </table>
            </header>);
    }

    private flag_button_text() {
        if (this.props.isFlagModeOn) {
            return "Flag";
        }
        return "Pick";
    }
}