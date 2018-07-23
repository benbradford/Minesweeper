import Grid from './Grid'
import {IGridCell, Content} from './GridCell'

export default class MoveSolver {

    private grid: Grid;
    private queue: IGridCell[] = [];
    private queueStart = 0;

    constructor(grid: Grid) {
        this.grid = grid;
    }

    public is_valid_move(x: number, y: number) {
       return this.is_valid_move_for_cell(this.grid.cell(x, y));      
    }

    public make_move(x: number, y: number) {
        if (this.has_more_steps()) {
            return;
        }
        const cell = this.grid.guaranteed_cell(x,y);
        if (this.is_valid_move_for_cell(cell) === false || cell.content === Content.mine) {
            return;
        }

        this.queueStart = 0;
        this.queue = [this.grid.guaranteed_cell(x, y)];
        this.step();
    }

    public step() {
        const cell = this.queue[this.queueStart];
        if (cell.content === Content.mine) {
            throw new Error("found mine in step");
        }
        ++this.queueStart;
        cell.revealed = true;
        if (cell.content === 0) {
            this.add_surrounding_to_queue(cell);
        }
    }

    public has_more_steps() {
        return this.queueStart < this.queue.length;
    }

    private is_valid_move_for_cell(cell: IGridCell | null) {
        return cell !== null && cell.revealed === false;
    }

    private add_surrounding_to_queue(c: IGridCell) {
        const surrounding = this.grid.surrounding(c.coords.column, c.coords.row);
        for (const s of surrounding) {
            this.add_to_queue_if_unique_and_not_revealed(s);
        }
    }

    private add_to_queue_if_unique_and_not_revealed(cell: IGridCell) {
        if (cell.content === Content.mine) {
            throw new Error("shouldnt be mine");
        }
        if (cell.revealed) {
            return;
        }
        for (const c of this.queue) {
            if (c.coords.column === cell.coords.column && c.coords.row === cell.coords.row) {
                return;
            }
        }
        this.queue.push(cell);
    }

}