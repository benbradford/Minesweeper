import GridStepperState from './GridStepperState'
import GameStateStack from './GameStateStack'
import {IGridCell} from '../Model/GridCell'
import Grid from '../Model/Grid'
import GridRevealer from '../Model/GridRevealer'

export default class MoveState extends GridStepperState {

    constructor(stack: GameStateStack, grid: Grid, cell: IGridCell) {
        super(stack, grid, cell, new GridRevealer(grid), 2);
    }
}