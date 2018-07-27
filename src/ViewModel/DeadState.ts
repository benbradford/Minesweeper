import GameState from './GameState'
import GameStateStack from './GameStateStack'
import {GameStateType} from './GameStateType'
import Grid from '../Model/Grid'

export default class DeadState extends GameState {

    constructor(stack: GameStateStack, grid: Grid) {
        super(stack, grid);
    }
    
    public type() : GameStateType {
        return GameStateType.Dead;
    }
}