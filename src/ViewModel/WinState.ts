import GameState from './GameState'
import GameStateStack from './GameStateStack'
import Grid from '../Model/Grid'
import {GameStateType} from './GameStateType'

export default class WinState extends GameState {

    constructor(stack: GameStateStack, grid: Grid) {
        super(stack, grid);
    }

    public type() : GameStateType {
        return GameStateType.Win;
    }
}