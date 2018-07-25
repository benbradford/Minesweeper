
export enum Content {
    empty = 0,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    mine
}

export interface ICoords {
    column: number;
    row: number;
}

export interface IGridCell {
    revealed: boolean;
    content: Content;
    coords: ICoords;
    flagged: boolean;
}