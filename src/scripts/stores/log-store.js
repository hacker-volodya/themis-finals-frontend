import alt from '../alt'
import LogActions from '../actions/log-actions'
import { List } from 'immutable'
import eventManager from '../event-manager'
import LogModel from '../models/log-model'


class LogStore {
    constructor() {
        this.state = {
            loading: false,
            err: null,
            collection: new List()
        }

        this.bindListeners({
            handlePush: LogActions.PUSH
        })

        if (eventManager.enabled) {
            eventManager.eventSource.addEventListener('log', (e) => {
                let data = JSON.parse(e.data)
                data.id = parseInt(e.lastEventId, 10)
                LogActions.push(new LogModel(data))
            })
        }
    }

    handlePush(log) {
        while (this.state.collection.size > 300) {
            this.state.collection = this.state.collection.shift()
        }

        this.setState({
            loading: false,
            err: null,
            collection: this.state.collection.push(log)
        })
    }
}


export default alt.createStore(LogStore, 'LogStore')
