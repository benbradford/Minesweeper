import GridStepperState from './GridStepperState'
import GameStateStack from './GameStateStack'
import {IGridCell} from '../Model/GridCell'
import Grid from '../Model/Grid'
import MoveStepper from '../Model/MoveStepper'
import {GameStateType} from './GameStateType'
import WinState from './WinState'

export default class MoveState extends GridStepperState {

    constructor(stack: GameStateStack, grid: Grid, cell: IGridCell) {
        super(stack, grid, cell, new MoveStepper(grid), 2);
    }

    public type() : GameStateType {
        return GameStateType.Moving;
    }

    protected on_complete(): void {
        for (let r = 0; r < this.grid.height; ++r) {
            for (let c = 0; c < this.grid.width; ++c) {
                if (this.grid.guaranteed_cell(c,r).revealed === false) {
                    this.stack().pop();
                    return;
                }
            }
        }
        this.stack().push(new WinState(this.stack(), this.grid));
    }
}