import Grid from '../Model/Grid'
import {IGridCell, Content} from '../Model/GridCell'
import GridStepper from './GridStepper'

export default class MoveSolver extends GridStepper {

    constructor(grid: Grid, speed: number) {
        super(grid, speed);
    }

    protected should_add_surrounding_to_queue(cell: IGridCell) {
        return cell.content === 0;
    }

    protected should_add_cell_to_queue(cell: IGridCell) {
        return (cell.revealed === false && this.is_contained_in_queue(cell) === false);
    }

    protected can_begin_from_cell(cell: IGridCell) {
        return cell !== null && cell.revealed === false && cell.content !== Content.mine;
    }

}