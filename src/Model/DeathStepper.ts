import Grid from '../Model/Grid'
import {IGridCell, Content} from '../Model/GridCell'
import GridStepper from './GridStepper'

export default class DeathStepper extends GridStepper {

    constructor(grid: Grid) {
        super(grid);
    }

    protected should_add_surrounding_to_queue(cell: IGridCell) {
        return true;
    }

    protected should_add_cell_to_queue(cell: IGridCell) {
        return (this.is_contained_in_queue(cell) === false);
    }

    protected can_begin_from_cell(cell: IGridCell) {
        return cell.content === Content.exploded;
    }

    protected should_step_again(cell: IGridCell): boolean {
        return cell.revealed;
    }
}