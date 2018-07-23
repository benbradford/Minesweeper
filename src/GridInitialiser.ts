import Grid from './Grid'
import {IGridCell, Content} from './GridCell'

type NumberSetter = (x: number, y: number, num: number)=> void;
type MineSetter = (x: number, y: number)=> void;

export default class GridInitialiser {

    private numberSetter: NumberSetter;
    private mineSetter: MineSetter;
    
    constructor(numberSetter: NumberSetter, mineSetter: MineSetter) {
        this.numberSetter = numberSetter;
        this.mineSetter = mineSetter;
    }

    public set_mines(grid: Grid, numMines: number) {
        let remaining = numMines;
        while (remaining > 0) {
            const x = Math.floor(Math.random() * (grid.width - 1));
            const y = Math.floor(Math.random() * (grid.height - 1));
            const cell = grid.guaranteed_cell(x, y);
            if (cell.content === Content.empty) {
                this.mineSetter(x, y);
                --remaining;
            }    
        }
    }

    public set_numbers(grid: Grid) {
        for (let y = 0; y < grid.height; ++y) {
            for (let x = 0; x <  grid.width; ++x) {
                if (grid.is_mine(x,y)) {
                    continue;
                }
                const surrounding = grid.surrounding(x,y);
                this.numberSetter(x, y, this.calculate_number(surrounding));
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