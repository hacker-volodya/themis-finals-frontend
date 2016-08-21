import alt from '../alt'

class LogActions {
  push (logs) {
    return (dispatch) => {
      dispatch(logs)
    }
  }
}

export default alt.createActions(LogActions)
