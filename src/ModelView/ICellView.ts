export enum CellState {
    hidden,
    revealed,
    flagged, 
}

export enum MineState {
    none,
    present,
    exploded
}

export interface ICellView {
    cellState: CellState;
    mineState: MineState;
    flagged: boolean;
    num: number | null;
}