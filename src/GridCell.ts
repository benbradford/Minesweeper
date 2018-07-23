
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
    mine,
    flag
}

export interface IGridCell {
    revealed: boolean;
    content: Content;
}