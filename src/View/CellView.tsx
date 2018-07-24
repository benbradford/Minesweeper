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
            return (<td className="Cell Reveal">{cell.num}</td>);
        } else if (cell.cellState === CellState.mine) {
            return (<td className="Cell Reveal">M</td>);
        } else if (cell.cellState === CellState.empty) {
            return (<td className="Cell Reveal">{" "} </td>);
        }
        return ( <p/> );  
    }
}