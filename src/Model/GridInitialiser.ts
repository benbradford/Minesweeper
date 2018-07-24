import Grid from './Grid'
import {IGridCell, Content} from './GridCell'

export default class GridInitialiser {

    private grid: Grid;

    constructor(grid: Grid) {
        this.grid = grid;
    }

    public populate_grid_with_mines() {
        let remaining = this.grid.numMines;
        while (remaining > 0) {
            const x = Math.floor(Math.random() * (this.grid.width - 1));
            const y = Math.floor(Math.random() * (this.grid.height - 1));
            const cell = this.grid.guaranteed_cell(x, y);
            if (cell.content === Content.empty) {
                cell.content = Content.mine;
                --remaining;
            }    
        }
    }

    public populate_numbers_in_grid() {
        for (let y = 0; y < this.grid.height; ++y) {
            for (let x = 0; x <  this.grid.width; ++x) {
                if (this.grid.is_mine(this.grid.guaranteed_cell(x,y))) {
                    continue;
                }
                const surrounding = this.grid.surrounding(x,y);
                this.grid.guaranteed_cell(x, y).content = this.calculate_number(surrounding);
            }
        }
    }

    private calculate_number(surrounding: IGridCell[]): number {
        let numMines = 0;
        for (const c of surrounding) {
            if (c.content === Content.mine) {
                ++numMines;
            }
        }
        return numMines;
    }
}