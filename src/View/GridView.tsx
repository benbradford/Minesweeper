import * as React from 'react'
import {ICellView} from '../ModelView/ICellView'
import Game from '../ModelView/Game'

interface IGridViewState {
    cells: ICellView[][];
}

export default class GridView extends React.Component<any, IGridViewState>{
    
    private interval: NodeJS.Timer;
    private game = new Game();

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
            return ( <table className="center">{this.state.cells.map((row: ICellView[], index: number) => this.render_row(row, index))}</table> );
        }
        return (<p/>);
    }

    private render_row(row: ICellView[], rowIndex: number) {
        return (<tr className="Row">{row.map((c: ICellView, columnIndex: number) => this.render_cell(c, rowIndex, columnIndex) )}</tr>);
    }

    private render_cell(cell: ICellView, r: number, c: number): JSX.Element {
        return (<td className="Cell Hidden"><button /></td>);      
    }

    private update() {
        if (this.game.tick()) {
            this.setState({cells: this.game.sync()});
        }
    }
}