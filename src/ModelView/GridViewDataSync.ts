import {ICellView, MineState, CellState} from './ICellView'
import Grid from '../Model/Grid'
import {IGridCell, Content} from '../Model/GridCell'

export default class GridViewDataSync {

    private grid: Readonly<Grid>;
    
    constructor(grid: Readonly<Grid>) {
        this.grid = grid;
    }

    public sync(): ICellView[][] {
        const data: ICellView[][] = [];
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
        if (cell.revealed) {
            cs = CellState.revealed;
        }

        let ms = MineState.none;
        if (cell.content === Content.mine) {
            ms = MineState.present;
        }

        let n: number | null = null;
        if (cell.content > 0 && cell.content <= Content.eight) {
            n = cell.content;
        }

        const f = false;

        return {cellState: cs, mineState: ms, num: n, flagged: f};
    }
}