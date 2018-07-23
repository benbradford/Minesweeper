import {IGridCell, Content} from './GridCell'
import GridInitialiser from './GridInitialiser'

export default class Grid {
    public readonly width: number;
    public readonly height: number;
    public readonly numMines: number;

    private data: IGridCell[][] = [];

    constructor(width: number, height: number, numMines: number, gridInitialiser: GridInitialiser) {
        this.width = width;
        this.height = height;
        this.numMines = numMines;
         for (let y = 0; y < height; ++y) {
            this.data.push([]);
            for (let x = 0; x < width; ++x) {
                this.data[y].push({revealed: false, content: Content.empty});
            }
        }
        gridInitialiser.set_mines(this, numMines);
        gridInitialiser.set_numbers(this);
    }

    public cells(): Readonly<IGridCell[][]> {
        return this.data;
    }

    public cell(x: number, y: number): IGridCell | null {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return null;
        }
        return this.data[x][y];
    }

    public guaranteed_cell(x: number, y: number): IGridCell {
        return this.data[x][y];
    }

    public surrounding(x: number, y: number): Array<Readonly<IGridCell>> {
        const cells: IGridCell[] = [];
        const cell = this.cell(x,y);
        if ( cell === null) {
            return cells;
        }
        const addIfNotNull = (xx: number, yy: number) => {
            const c = this.cell(xx, yy);
            if (c !== null) {
                cells.push(c);
            }
        }
        addIfNotNull(x-1, y);
        addIfNotNull(x-1, y-1);
        addIfNotNull(x, y-1);
        addIfNotNull(x+1, y-1);
        addIfNotNull(x+1, y);
        addIfNotNull(x+1, y+1);
        addIfNotNull(x, y+1);
        addIfNotNull(x-1, y+1);
        return cells;
    }

    public is_mine(x: number, y: number) {
        const cell = this.cell(x,y);
        if (cell) {
            return cell.content === Content.mine;
        }
        return false;
    }

}