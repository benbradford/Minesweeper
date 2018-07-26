import GridStepperState from './GridStepperState'
import GameStateStack from './GameStateStack'
import {IGridCell} from '../Model/GridCell'
import Grid from '../Model/Grid'
import DeathStepper from '../Model/DeathStepper'
import {Content} from '../Model/GridCell'

export default class MoveState extends GridStepperState {

    constructor(stack: GameStateStack, grid: Grid, cell: IGridCell) {
        cell.content = Content.exploded;
        super(stack, grid, cell, new DeathStepper(grid), 2);
    }
}