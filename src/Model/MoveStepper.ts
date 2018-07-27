import Grid from '../Model/Grid'
import {IGridCell, Content} from '../Model/GridCell'
import GridStepper from './GridStepper'

export default class MoveStepper extends GridStepper {

    constructor(grid: Grid) {
        super(grid);
    }

    protected should_add_surrounding_to_queue(cell: IGridCell) {
        return cell.content === 0;
    }

    protected should_add_cell_to_queue(cell: IGridCell) {
        return (cell.revealed === false && cell.flagged === false && this.is_contained_in_queue(cell) === false);
    }

    protected can_begin_from_cell(cell: IGridCell) {
        return cell !== null && cell.revealed === false && cell.content !== Content.mine;
    }

    protected should_step_again(cell: IGridCell): boolean {
        return false;
    }
}