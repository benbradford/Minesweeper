import GameStateStack from './GameStateStack'
import PickState from './PickState'
import Grid from '../Model/Grid'
import GridInitialiser from '../Model/GridInitialiser'
import GridViewDataSync from 'src/ViewModel/GridViewDataSync';

export default class Game {

    private grid: Grid;
    private stateStack: GameStateStack;
    private dataSync: GridViewDataSync;
    private syncCallback: ()=>void | null;

    constructor() {
        this.reset();
    }

    public set_sync_callback(sync: ()=>void) {
        this.syncCallback = sync;
    }

    public tick() {
        return this.stateStack.current().tick();
    }

    public request_reset() {
        this.reset();
        return true;
    }

    public state() {
        return this.stateStack.current().type();
    }

    public click(row: number, col: number) {
        return this.stateStack.current().on_click(this.grid.guaranteed_cell(row, col));
    }

    public toggle_flag_mode() {
        this.dataSync.toggle_flag_mode();
        this.stateStack.current().on_flag_mode_change(this.dataSync.is_flag_mode_on());
    }

    public sync() { 
        return this.dataSync.sync();
    }

    public is_flag_mode_on() {
        return this.dataSync.is_flag_mode_on();
    }

    private reset() {
        this.grid = new Grid(16, 16, 40);
        const init = new GridInitialiser(this.grid);
        init.populate_grid_with_mines();
        init.populate_numbers_in_grid();

        this.stateStack = new GameStateStack( ()=>{ this.invoke_sync_callback()} );
        this.stateStack.push(new PickState(this.stateStack, this.grid), false);
        this.dataSync = new GridViewDataSync(this.grid);
        
    }

    private invoke_sync_callback() {
        if (this.syncCallback) {
            this.syncCallback();
        }
    }
}