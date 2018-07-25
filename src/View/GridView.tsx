import * as React from 'react'
import {ICellData} from '../ViewModel/ICellData'
import Game from '../ViewModel/Game'
import CellView from './CellView'

import './Grid.css'

interface IGridViewProps {
    game: Game;
    onClick: (row: number, column: number) => void;
    cells: ICellData[][];
}

export default class GridView extends React.Component<IGridViewProps, any>{
    
    public render() {     
        return (
            <section>
                {this.render_grid()}
            </section>
        );
    }

    private render_grid() {
        return ( <table className="center">{this.props.cells.map((row: ICellData[], index: number) => this.render_row(row, index))}</table> );
    }

    private render_row(row: ICellData[], rowIndex: number) {
        return (<tr className="Row">{row.map((c: ICellData, columnIndex: number) => this.render_cell(c, rowIndex, columnIndex) )}</tr>);
    }

    private render_cell(cl: ICellData, c: number, r: number) {
        const cli = (row: number, column: number)=> {this.props.onClick(row, column)};
        return (<CellView cell={cl} row={r} column={c} onClick={cli}/>); 
    }
 
}