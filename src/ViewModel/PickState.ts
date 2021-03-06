import GameState from './GameState'
import GameStateStack from './GameStateStack'
import DyingState from './DyingState'
import FlagState from './FlagState'
import MoveState from './MoveState'
import {GameStateType} from './GameStateType'
import {IGridCell} from '../Model/GridCell'
import Grid from '../Model/Grid'

export default class PickState extends GameState {

    constructor(stack: GameStateStack, grid: Grid) {
        super(stack, grid);
    }

    public on_click(cell: IGridCell): boolean {
        if (cell.flagged) {
            return false;
        } else if (this.grid.is_mine(cell)) {
            this.stack().push( new DyingState(this.stack(), this.grid, cell));
        } else {
            this.stack().push( new MoveState(this.stack(), this.grid, cell));
        }
        return true;
    }

    public on_flag_mode_change(isFlagMode: boolean): void {
        if (isFlagMode) {
            this.stack().push(new FlagState(this.stack(), this.grid));
        }
    }

    public type() : GameStateType {
        return GameStateType.Picking;
    }
}