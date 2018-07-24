import GameState from './GameState'
import GameStateStack from './GameStateStack'
import {IGridCell} from '../Model/GridCell'
import Grid from '../Model/Grid'
import MoveSolver from './MoveSolver'

export default class MoveState extends GameState {

    private moveSolver: MoveSolver;

    constructor(stack: GameStateStack, grid: Grid, cell: IGridCell) {
        super(stack, grid);
        this.moveSolver = new MoveSolver(this.grid, 4);
        this.moveSolver.begin(cell.coords.column, cell.coords.row);
    }

    public tick(): boolean {
        if (this.moveSolver.has_more_steps()) {
            return this.moveSolver.step();
        } else {
            this.stack().pop();
        }
        return false;
    }
}