import alt from '../alt'
import { List } from 'immutable'


class LogActions {
    push(log) {
        this.dispatch(log)
    }
}


export default alt.createActions(LogActions)
