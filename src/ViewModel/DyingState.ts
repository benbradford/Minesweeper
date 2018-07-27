import GridStepperState from './GridStepperState'
import GameStateStack from './GameStateStack'
import DeadState from './DeadState'
import {GameStateType} from './GameStateType'
import {IGridCell} from '../Model/GridCell'
import Grid from '../Model/Grid'
import DeathStepper from '../Model/DeathStepper'
import {Content} from '../Model/GridCell'

export default class DyingState extends GridStepperState {

    constructor(stack: GameStateStack, grid: Grid, cell: IGridCell) {
        cell.content = Content.exploded;
        super(stack, grid, cell, new DeathStepper(grid), 1);
    }

    public type() : GameStateType {
        return GameStateType.Dying;
    }

    protected on_complete(): void {
        this.stack().push(new DeadState(this.stack(), this.grid));
    }

}