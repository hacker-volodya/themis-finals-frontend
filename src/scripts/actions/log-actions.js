import alt from '../alt'

class LogActions {
  push (logs) {
    this.dispatch(logs)
  }
}

export default alt.createActions(LogActions)
