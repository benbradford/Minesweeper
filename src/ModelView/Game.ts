import GameStateStack from './GameStateStack'
import PickState from './PickState'
import Grid from '../Model/Grid'
import GridInitialiser from '../Model/GridInitialiser'
import GridViewDataSync from 'src/ModelView/GridViewDataSync';

export default class Game {

    private grid: Grid;
    private stateStack: GameStateStack;
    private dataSync: GridViewDataSync;

    constructor() {
        this.reset();
    }

    public tick() {
        return this.stateStack.current().tick();
    }

    public request_reset() {
        this.reset();
        return true;
    }

    public click(row: number, col: number) {
        return this.stateStack.current().on_click(this.grid.guaranteed_cell(row, col));
    }

    public set_flag_mode(flagModeOn: boolean) {
        this.stateStack.current().on_flag_mode_change(flagModeOn);
    }

    public sync() { 
        return this.dataSync.sync();
    }

    private reset() {
        this.grid = new Grid(16, 16, 50);
        const init = new GridInitialiser(this.grid);
        init.populate_grid_with_mines();
        init.populate_numbers_in_grid();

        this.stateStack = new GameStateStack();
        this.stateStack.push(new PickState(this.stateStack, this.grid));
        this.dataSync = new GridViewDataSync(this.grid);
    }
}