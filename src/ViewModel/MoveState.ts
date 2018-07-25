import GridStepperState from './GridStepperState'
import GameStateStack from './GameStateStack'
import {IGridCell} from '../Model/GridCell'
import Grid from '../Model/Grid'
import GridMoveSolver from '../Model/GridMoveSolver'

export default class MoveState extends GridStepperState {

    constructor(stack: GameStateStack, grid: Grid, cell: IGridCell) {
        super(stack, grid, cell, new GridMoveSolver(grid), 2);
    }
}