import GameState from './GameState'

export default class GameStateStack {

    private stack: GameState[] = [];
    private sync: ()=>void;

    constructor(sync: ()=>void) {
        this.sync = sync;
    }
    public push(state: GameState, performSync: boolean = true) {
        this.stack.push(state);
        if (performSync) {
            this.sync();
        }
    }

    public pop() {
        this.stack.splice(this.stack.length-1,1);
        this.sync();
    }

    public current() {
        return this.stack[this.stack.length-1];
    }
}