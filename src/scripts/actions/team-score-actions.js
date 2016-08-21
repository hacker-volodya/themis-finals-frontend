import 'whatwg-fetch'
// import { Promise } from 'es6-promise'

import alt from '../utils/alt'
import TeamScoreModel from '../models/team-score-model'
import { List } from 'immutable'

class TeamScoreActions {
  static fetchPromise () {
    return new Promise((resolve, reject) => {
      fetch('/api/team/scores')
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
        let teamScores = data.map((props) => {
          return new TeamScoreModel(props)
        })
        resolve(new List(teamScores))
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  update (teamScores) {
    return teamScores
  }

  updateSingle (teamScore) {
    return teamScore
  }

  fetch () {
    return (dispatch) => {
      dispatch()

      TeamScoreActions
      .fetchPromise()
      .then((teamScores) => {
        this.update(teamScores)
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

export default alt.createActions(TeamScoreActions)
