export enum CellState {
    hidden,
    flagged, 
    empty,
    mine,
    exploded,
    number
}

export interface ICellData {
    cellState: CellState;
    num: number | null;
}