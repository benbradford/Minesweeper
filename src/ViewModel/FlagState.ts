import GameState from './GameState'
import GameStateStack from './GameStateStack'
import {GameStateType} from './GameStateType'
import {IGridCell} from '../Model/GridCell'
import Grid from '../Model/Grid'

export default class FlagState extends GameState {

    constructor(stack: GameStateStack, grid: Grid) {
        super(stack, grid);
    }

    public on_click(cell: IGridCell): boolean {
        if (cell.revealed === false) {
            cell.flagged = !cell.flagged;
            return true;
        }
        return false;
    }

    public on_flag_mode_change(isFlagMode: boolean): void {
        if (isFlagMode === false) {
            this.stack().pop();
        }
    }

    public type() : GameStateType {
        return GameStateType.Flagging;
    }
}