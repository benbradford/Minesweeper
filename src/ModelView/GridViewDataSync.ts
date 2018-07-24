import {ICellData, CellState} from './ICellData'
import Grid from '../Model/Grid'
import {IGridCell, Content} from '../Model/GridCell'

export default class GridViewDataSync {

    private grid: Readonly<Grid>;
    
    constructor(grid: Readonly<Grid>) {
        this.grid = grid;
    }

    public sync() {
        const data: ICellData[][] = [];
        for (let y = 0; y < this.grid.height; ++y) {
            data.push([]);
            for (let x = 0; x < this.grid.width; ++x) {
                data[y].push(this.cell_view_from_model(this.grid.guaranteed_cell(x, y)));
            }
        }
        return data;
    }

    private cell_view_from_model(cell: IGridCell) {
        let cs = CellState.hidden;
        let n: number | null = null;
        if (cell.revealed) {
            if (cell.content === Content.mine) {
                cs = CellState.mine;
            } else if (cell.content === Content.empty) {
                cs = CellState.empty;
            } else if (cell.content > 0 && cell.content <= Content.eight) {
                n = cell.content;
                cs = CellState.number;
            } else {
                cs = CellState.hidden;
            }
        }

        return {cellState: cs, num: n,};
    }
}