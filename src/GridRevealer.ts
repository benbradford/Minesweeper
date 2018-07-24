import Grid from './Grid'
import {IGridCell, Content} from './GridCell'
import GridStepper from './GridStepper'

export default class GridRevealer extends GridStepper {

    constructor(grid: Grid, speed: number) {
        super(grid, speed);
    }

    protected should_add_surrounding_to_queue(cell: IGridCell) {
        return true;
    }

    protected should_add_cell_to_queue(cell: IGridCell) {
        return (this.is_contained_in_queue(cell) === false);
    }

    protected can_begin_from_cell(cell: IGridCell) {
        return cell.content === Content.mine;
    }

}