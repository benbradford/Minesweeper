import * as React from 'react'
import {ICellData, CellState} from '../ModelView/ICellData'

interface IGridViewProps {
    cell: ICellData;
    row: number;
    column: number;
    onClick: (row: number, column: number) => void;
}

export default class GridView extends React.Component<IGridViewProps, any>{
 
    public render() {     
        const cell = this.props.cell;
        const r = this.props.row;
        const c = this.props.column;
        
        if (cell.cellState === CellState.hidden) {
            const oc = () => { this.props.onClick(r, c); };
            return (<td className="Cell Hidden"><button onClick={oc}/></td>); 
        } else if (cell.cellState === CellState.number && cell.num) {
            return (<td className="Cell Reveal" style={ this.number_style(cell.num) } >{cell.num}</td>);
        } else if (cell.cellState === CellState.mine) {
            return (<td className="Cell Reveal">M</td>);
        } else if (cell.cellState === CellState.empty) {
            return (<td className="Cell Reveal">{" "} </td>);
        }
        return ( <p/> );  
    }

    private number_style(num: number) {
        let col = "blue";
        if (num === 2) {
            col = "green";
        } else if ( num === 3) {
            col = "red";
        } else if ( num === 4) {
            col = "purple";
        } else if ( num === 5) {
            col = "maroon";
        } else if ( num === 6) {
            col = "cadetblue";
        } else if ( num === 7) {
            col = "black";
        } else if ( num === 8) {
            col = "darkgray"
        }
        return {
            color: col
        };
    }
}