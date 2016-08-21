import 'whatwg-fetch'
// import { Promise } from 'es6-promise'

import alt from '../alt'
import ServiceModel from '../models/service-model'
import { List } from 'immutable'

class ServiceActions {
  static fetchPromise () {
    return new Promise((resolve, reject) => {
      fetch('/api/services')
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
        let services = data.map((props) => {
          return new ServiceModel(props)
        })
        resolve(new List(services))
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  update (services) {
    return services
  }

  fetch () {
    return (dispatch) => {
      dispatch()

      ServiceActions
      .fetchPromise()
      .then((services) => {
        this.update(services)
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

export default alt.createActions(ServiceActions)
