import * as React from 'react'
import {ICellData} from '../ModelView/ICellData'
import Game from '../ModelView/Game'
import CellView from './CellView'

interface IGridViewState {
    cells: ICellData[][];
}

export default class GridView extends React.Component<any, IGridViewState>{
    
    private interval: NodeJS.Timer;
    private game: Game = new Game();

    public componentDidMount() {
      this.interval = setInterval(() => this.update(), 1);
      this.setState({cells: this.game.sync()});
   }
   
   public  componentWillUnmount() {
       clearInterval(this.interval);
   }

    public render() {     
        return (
            <section>
                {this.render_grid()}
            </section>
        );
    }

    private render_grid() {
        if (this.state && this.state.cells) {
            return ( <table className="center">{this.state.cells.map((row: ICellData[], index: number) => this.render_row(row, index))}</table> );
        }
        return (<p/>);
    }

    private render_row(row: ICellData[], rowIndex: number) {
        return (<tr className="Row">{row.map((c: ICellData, columnIndex: number) => this.render_cell(c, rowIndex, columnIndex) )}</tr>);
    }

    private render_cell(cl: ICellData, c: number, r: number) {
        const cli = (row: number, column: number)=> {this.on_click(row, column)};
        return (<CellView cell={cl} row={r} column={c} onClick={cli}/>); 
    }

    private update() {
        if (this.game.tick()) {
            this.setState({cells: this.game.sync()});
        }
    }

    private on_click(row: number, column: number) {
        if (this.game.click(row, column)) {
            this.setState({cells: this.game.sync()});
        }
    }
}