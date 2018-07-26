export enum CellState {
    hidden,
    flagged, 
    empty,
    mine,
    exploded,
    number,
    flaggedIncorrect
}

export interface ICellViewData {
    cellState: CellState;
    num: number | null;
}