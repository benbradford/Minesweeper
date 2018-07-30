import GameStateStack from './GameStateStack'
import {GameStateType} from './GameStateType'
import {IGridCell} from '../Model/GridCell'
import Grid from '../Model/Grid'

export default abstract class GameState {
    /* tslint:disable:no-empty */
    protected grid: Grid;
    private stateStack: GameStateStack;
   
    constructor (stateStack: GameStateStack, grid: Grid) {
        this.stateStack = stateStack;
        this.grid = grid;
    }

    public abstract type() : GameStateType;

    public on_click(cell: IGridCell): boolean { return false; }
    public on_flag_mode_change(isFlagMode: boolean): void { }
    public tick(): boolean { return false; } // return true for state update

    protected stack() {
        return this.stateStack;
    }
}