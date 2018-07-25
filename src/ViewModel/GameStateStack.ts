import GameState from './GameState'

export default class GameStateStack {

    private stack: GameState[] = [];

    public push(state: GameState) {
        this.stack.push(state);
    }

    public pop() {
        this.stack.splice(this.stack.length-1,1);
    }

    public current() {
        return this.stack[this.stack.length-1];
    }
}