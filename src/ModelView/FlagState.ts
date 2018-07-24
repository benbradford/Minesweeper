import GameState from './GameState'
import GameStateStack from './GameStateStack'
import {IGridCell} from '../Model/GridCell'
import Grid from '../Model/Grid'

export default class FlagState extends GameState {

    constructor(stack: GameStateStack, grid: Grid) {
        super(stack, grid);
    }

    public on_click(cell: IGridCell): boolean {
        if (cell.revealed === false) {
            // :TODO: flagging is really just a view thing, so probably time to copy data from model
        }
        return false;
    }

    public on_flag_mode_change(isFlagMode: boolean): void {
        if (isFlagMode === false) {
            this.stack().pop();
        }
    }
}