import {ICellViewData, CellState} from './ICellViewData'
import Grid from '../Model/Grid'
import {IGridCell, Content} from '../Model/GridCell'

export default class GridViewDataSync {

    private grid: Readonly<Grid>;
    private flagModeOn = false;

    constructor(grid: Readonly<Grid>) {
        this.grid = grid;
    }

    public sync() {
        const data: ICellViewData[][] = [];
        for (let y = 0; y < this.grid.height; ++y) {
            data.push([]);
            for (let x = 0; x < this.grid.width; ++x) {
                data[y].push(this.cell_view_from_model(this.grid.guaranteed_cell(x, y)));
            }
        }
        return data;
    }

    public toggle_flag_mode() {
        this.flagModeOn = !this.flagModeOn;
    }

    public is_flag_mode_on() {
        return this.flagModeOn;
    }

    private cell_view_from_model(cell: IGridCell) {
        let cs = CellState.hidden;
        let n: number | null = null;
        if (cell.revealed) {
            if (cell.content === Content.mine) {
                cs = CellState.mine;
                if (cell.flagged) {
                    cs = CellState.flaggedIncorrect;
                }
            } else if (cell.content === Content.empty) {
                cs = CellState.empty;
            } else if (cell.content > 0 && cell.content <= Content.eight) {
                n = cell.content;
                cs = CellState.number;
            } else if (cell.content === Content.exploded) {
                cs = CellState.exploded;
            } else {
                cs = CellState.hidden;
            }
        } else {
            if (cell.flagged) {
                cs = CellState.flagged;
            } else {
                cs = CellState.hidden;
            }
        }

        return {cellState: cs, num: n,};
    }
}