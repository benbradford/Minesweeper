import GameState from './GameState'
import GameStateStack from './GameStateStack'
import {IGridCell} from '../Model/GridCell'
import Grid from '../Model/Grid'
import GridRevealer from './GridRevealer'

export default class DyingState extends GameState {

    private revealer: GridRevealer;

    constructor(stack: GameStateStack, grid: Grid, cell: IGridCell) {
        super(stack, grid);
        this.revealer = new GridRevealer(grid, 1);
        this.revealer.begin(cell.coords.column, cell.coords.row);
    }

    public tick(): boolean {
        if (this.revealer.has_more_steps()) {
            return this.revealer.step();
        } else {
            this.stack().pop();
        }
        return false;
    }
}