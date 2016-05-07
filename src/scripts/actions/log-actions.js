import alt from '../alt'
import { List } from 'immutable'


class LogActions {
    push(logs) {
        this.dispatch(logs)
    }
}


export default alt.createActions(LogActions)
