import Grid from '../Model/Grid'
import {IGridCell} from '../Model/GridCell'

export default abstract class GridStepper {
    
    private grid: Grid;
    private queue: IGridCell[] = [];
    private queueStart = 0;
    private readonly stepSpeed: number;
    private stepCount = 0;

    constructor(grid: Grid, speed: number) {
        this.grid = grid;
        this.stepSpeed = speed;
        this.stepCount = 0;
    }

    public begin(x: number, y: number) {
        if (this.has_more_steps()) {
            return false;
        }
        const cell = this.grid.guaranteed_cell(x,y);
        if (this.can_begin_from_cell(cell) === false) {
            return false;
        }

        this.queueStart = 0;
        this.queue = [this.grid.guaranteed_cell(x, y)];
        this.stepCount = this.stepSpeed;
        return true;
    }

    public step(): boolean {
        ++this.stepCount;
        if (this.stepCount < this.stepSpeed) {
            return false;
        }
        this.stepCount = 0;
        const cell = this.queue[this.queueStart];
        
        ++this.queueStart;
        cell.revealed = true;
        if (this.should_add_surrounding_to_queue(cell)) {
            this.add_surrounding_to_queue(cell);
        }
        return true;
    }

    public has_more_steps() {
        return this.queueStart < this.queue.length;
    }


    protected abstract should_add_surrounding_to_queue(cell: IGridCell): boolean;
    protected abstract should_add_cell_to_queue(cell: IGridCell): boolean;
    protected abstract can_begin_from_cell(cell: IGridCell): boolean;

    protected is_contained_in_queue(cell: IGridCell) {
        for (const c of this.queue) {
            if (c.coords.column === cell.coords.column && c.coords.row === cell.coords.row) {
                return true;
            }
        }
        return false;
    }
    
    private add_surrounding_to_queue(c: IGridCell) {
        const surrounding = this.grid.surrounding(c.coords.column, c.coords.row);
        for (const s of surrounding) {
            if (this.should_add_cell_to_queue(s)) {
                this.queue.push(s);
            }
        }
    }
}