import GameState from './GameState'
import GameStateStack from './GameStateStack'
import {IGridCell} from '../Model/GridCell'
import Grid from '../Model/Grid'
import GridStepper from '../Model/GridStepper'

export default class MoveState extends GameState {

    private stepper: GridStepper;
    private speed: number;
    private speedCount: number;

    constructor(stack: GameStateStack, grid: Grid, cell: IGridCell, stepper: GridStepper, speed: number) {
        super(stack, grid);
        this.stepper = stepper;
        this.speed = speed;
        this.speedCount = speed;
        this.stepper.begin(cell.coords.column, cell.coords.row);     
    }

    public tick(): boolean {
        if (this.stepper.has_more_steps()) {
            ++this.speedCount;
            if (this.speedCount >= this.speed) {
                this.speedCount = 0;
                this.stepper.step();
                return true;
            }
        } else {
            this.stack().pop();
        }
        return false;
    }
}