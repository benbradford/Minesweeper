import * as React from 'react'
import {Images} from './CellAsset'
import {ICellViewData, CellState} from '../ViewModel/ICellViewData'
import './StyleSheet/Cell.css'

interface ICellViewProps {
    cell: ICellViewData;
    row: number;
    column: number;
    isFlagging: boolean;
    onClick: (row: number, column: number) => void;
}

interface IMouseOverState {
    isMouseOver: boolean
}

export default class CellView extends React.Component<ICellViewProps, IMouseOverState>{
    
    constructor(props: ICellViewProps, state: IMouseOverState) {
        super(props, state);
    }

    public render() {     
        const cell = this.props.cell;
        const onClick = () => { this.props.onClick(this.props.row, this.props.column); };
        if (cell.cellState === CellState.hidden) {          
            return (<td className="Cell Hidden" onMouseDown={onClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} style={ this.image_style(this.empty_style_index()) }/>); 
        } else if (cell.cellState === CellState.number && cell.num) {
            return (<td className="Cell Reveal" style={ this.number_style(cell.num)}  onMouseLeave={this.onMouseLeave} >{cell.num}</td>);
        } else if (cell.cellState === CellState.mine) {
            return (<td className="Cell Reveal" style={ this.image_style(6) } onMouseLeave={this.onMouseLeave}/>);
        } else if (cell.cellState === CellState.empty) {
            return (<td className="Cell Reveal" style={ this.image_style(2) } onMouseLeave={this.onMouseLeave}/>);
        } else if (cell.cellState === CellState.flagged) {
            return (<td className="Cell Hidden" onMouseDown={onClick} style={ this.image_style(4) } onMouseLeave={this.onMouseLeave}/>); 
        } else if (cell.cellState === CellState.flaggedIncorrect) {
            return (<td className="Cell Reveal" style={ this.image_style(5) }  onMouseLeave={this.onMouseLeave}/>);
        } else if (cell.cellState === CellState.exploded) {
            return (<td className="Cell Reveal" style={ this.image_style(3) } onMouseLeave={this.onMouseLeave}/>);
        }
        return ( <p/> );  
    }

    private number_style(num: number) {      
        return {
            color: this.number_color(num),
            backgroundImage: "url(" + Images[2] + ")"
        };
    }

    private image_style(imageIndex: number) {
        const img = Images[imageIndex];
        return { backgroundImage: "url(" + img + ")"};
    }

    private empty_style_index() {
        if (this.state && this.state.isMouseOver) {
            if (this.props.isFlagging) {
                return 7;
            }
            return 1;
        }
        return 0;
    }

    private number_color(num: number) {
        if (num === 2) {
            return "green";
        } else if ( num === 3) {
            return "red";
        } else if ( num === 4) {
            return "purple";
        } else if ( num === 5) {
            return "maroon";
        } else if ( num === 6) {
            return "cadetblue";
        } else if ( num === 7) {
            return "black";
        } else if ( num === 8) {
            return "darkgray"
        }
        return "blue";
    }

    private onMouseEnter = (): void => {
        this.setState({isMouseOver: true});
    }

    private onMouseLeave = (): void => {
        this.setState({isMouseOver: false});
    }
}