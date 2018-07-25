export enum CellState {
    hidden,
    flagged, 
    empty,
    mine,
    exploded,
    number,
    flaggedIncorrect
}

export interface ICellData {
    cellState: CellState;
    num: number | null;
}