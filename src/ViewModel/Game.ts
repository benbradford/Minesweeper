import GameStateStack from './GameStateStack'
import PickState from './PickState'
import GridViewDataSync from './GridViewDataSync'
import IGameState from './IGameState'
import Grid from '../Model/Grid'
import GridInitialiser from '../Model/GridInitialiser'

export default class Game {

    private grid: Grid;
    private stateStack: GameStateStack;
    private dataSync: GridViewDataSync;
    private stateListenerCallback: (state: IGameState) => void | null;

    constructor() {
        this.reset();
    }

    public register_state_change_listener(sync:  (state: IGameState) => void) {
        this.stateListenerCallback = sync;
        this.invoke_sync_callback();
    }

    public tick() {
        if (this.stateStack.current().tick()) {
            this.invoke_sync_callback();
        }
    }

    public request_reset() {
        this.reset();
        this.invoke_sync_callback();
    }

    public click(row: number, col: number) {
       if (this.stateStack.current().on_click(this.grid.guaranteed_cell(row, col))) {
        this.invoke_sync_callback();
       }
    }

    public toggle_flag_mode() {
        this.dataSync.toggle_flag_mode();
        this.stateStack.current().on_flag_mode_change(this.dataSync.is_flag_mode_on());
        this.invoke_sync_callback();
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
        if (this.stateListenerCallback) {
            this.stateListenerCallback( {
                cells: this.dataSync.sync(),
                flagModeOn: this.dataSync.is_flag_mode_on(),
                stateType: this.stateStack.current().type()
            });
        }
    }
}