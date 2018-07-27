import {ICellViewData} from './ICellViewData'
import {GameStateType} from './GameStateType'

export default interface IGameState {
    cells: ICellViewData[][];
    flagModeOn: boolean;
    stateType: GameStateType
}