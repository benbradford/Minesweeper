import GridStepperState from './GridStepperState'
import GameStateStack from './GameStateStack'
import {IGridCell} from '../Model/GridCell'
import Grid from '../Model/Grid'
import MoveStepper from '../Model/MoveStepper'

export default class MoveState extends GridStepperState {

    constructor(stack: GameStateStack, grid: Grid, cell: IGridCell) {
        super(stack, grid, cell, new MoveStepper(grid), 2);
    }
}