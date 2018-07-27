import * as React from 'react'
import CellView from './CellView'
import {ICellViewData} from '../ViewModel/ICellViewData'
import Game from '../ViewModel/Game'
import './Grid.css'

interface IGridViewProps {
    game: Game;
    onClick: (row: number, column: number) => void;
    cells: ICellViewData[][];
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
        return ( <table className="center" style= {{ transform: "scale(1.0, 1.0)"}}>{this.props.cells.map((row: ICellViewData[], index: number) => this.render_row(row, index))}</table> );
    }

    private render_row(row: ICellViewData[], rowIndex: number) {
        return (<tr className="Row">{row.map((c: ICellViewData, columnIndex: number) => this.render_cell(c, rowIndex, columnIndex) )}</tr>);
    }

    private render_cell(cl: ICellViewData, c: number, r: number) {
        const cli = (row: number, column: number)=> {this.props.onClick(row, column)};
        return (<CellView cell={cl} row={r} column={c} onClick={cli}/>); 
    }
 
}