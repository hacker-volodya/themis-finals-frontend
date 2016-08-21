import 'whatwg-fetch'
// import { Promise } from 'es6-promise'

import alt from '../utils/alt'
import ContestScoreboardModel from '../models/contest-scoreboard-model'

class ContestScoreboardActions {
  static fetchPromise () {
    return new Promise((resolve, reject) => {
      fetch('/api/contest/scoreboard')
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json()
        } else {
          let err = new Error(response.statusText)
          err.response = response
          throw err
        }
      })
      .then((data) => {
        resolve(new ContestScoreboardModel(data))
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  update (contestScoreboard) {
    return contestScoreboard
  }

  fetch () {
    return (dispatch) => {
      dispatch()

      ContestScoreboardActions
      .fetchPromise()
      .then((contestScoreboard) => {
        this.update(contestScoreboard)
      })
      .catch((err) => {
        this.failed(err)
      })
    }
  }

  failed (err) {
    return err
  }
}

export default alt.createActions(ContestScoreboardActions)
