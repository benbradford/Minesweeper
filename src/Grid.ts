import {IGridCell, Content} from './GridCell'

export default class Grid {
    public readonly width: number;
    public readonly height: number;
    public readonly numMines: number;

    private data: IGridCell[][] = [];

    constructor(width: number, height: number, numMines: number) {
        this.width = width;
        this.height = height;
        this.numMines = numMines;

        for (let y = 0; y < height; ++y) {
            this.data.push([]);
            for (let x = 0; x < width; ++x) {
                this.data[y].push({revealed: false, content: Content.empty, coords: {column: x, row:y}});
            }
        }
        /*this.data.push([]);
        this.data.push([]);
       

        this.data[0].push({revealed: false, content: Content.empty, coords: {column: 0, row:0}});
        this.data[0].push({revealed: false, content: Content.empty, coords: {column: 1, row:0}});

        this.data[0].push({revealed: false, content: Content.empty, coords: {column: 2, row:0}});
        this.data[0].push({revealed: false, content: Content.empty, coords: {column: 3, row:0}});

        this.data[1].push({revealed: false, content: Content.empty, coords: {column: 0, row:1}});
        this.data[1].push({revealed: false, content: Content.empty, coords: {column: 1, row:1}});

        this.data[1].push({revealed: false, content: Content.empty, coords: {column: 2, row:1}});
        this.data[1].push({revealed: false, content: Content.empty, coords: {column: 3, row:1}});

        this.cell(0,0);
        this.cell(1,0);
        this.cell(2,0);
        this.cell(3,0);
        this.cell(0,1);
        this.cell(1,1);
        this.cell(2,1);
        this.cell(3,1);
         /*for (let y = 0; y < height; ++y) {
            this.data.push([]);
            const d = this.data[y];
            for (let x = 0; x < width; ++x) {
                d.push({revealed: false, content: Content.empty, coords: {column: x, row:y}});
                this.cell(x,y);
            }
        }*/
    }

    public cells(): Readonly<IGridCell[][]> {
        return this.data;
    }

    public cell(column: number, row: number): IGridCell | null {
        if (column < 0 || column >= this.width || row < 0 || row >= this.height) {
            return null;
        }
        if (this.data[row][column].coords.column !== column || this.data[row][column].coords.row !== row) {
            throw new Error("invalid grid");
        }
        return this.data[row][column];
    }

    public guaranteed_cell(column: number, row: number): IGridCell {
        return this.data[row][column];
    }

    public surrounding(c: number, r: number): Array<Readonly<IGridCell>> {
        const cells: IGridCell[] = [];
        const cell = this.cell(c,r);
        if ( cell === null) {
            return cells;
        }
        const addIfNotNull = (cc: number, rr: number) => {
            const cellToAdd = this.cell(cc, rr);
            if (cellToAdd !== null) {
                cells.push(cellToAdd);
            }
        }
        addIfNotNull(c-1, r);
        addIfNotNull(c-1, r-1);
        addIfNotNull(c, r-1);
        addIfNotNull(c+1, r-1);
        addIfNotNull(c+1, r);
        addIfNotNull(c+1, r+1);
        addIfNotNull(c, r+1);
        addIfNotNull(c-1, r+1);
        return cells;
    }

    public is_mine(c: number, r: number) {
        const cell = this.cell(c,r);
        if (cell) {
            return cell.content === Content.mine;
        }
        return false;
    }

    public is_number(c: number, r: number) {
        const cell = this.cell(c,r);
        if (cell) {
            return cell.content <= Content.eight;
        }
        return false;
    }

}