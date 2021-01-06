import _ from 'lodash'
import moment from 'moment'
class CacheModel {
  timestamp: number
  data: any

  constructor(data: any) {
    this.timestamp = Date.now()
    this.data = data
  }

  
  get isExpired(): boolean {
    const timeout = 300
    const timestampWithTTL = moment(this.timestamp).add(timeout, 'seconds')
    const now = moment()
    return timestampWithTTL.isBefore(now)
  }

  createCacheData() {
    return {
      timestamp: this.timestamp,
      data: this.data
    }
  }

  static convertToModel(json): CacheModel {
    const model = new CacheModel(_.get(json, 'data'))
    model.timestamp = _.get(json, 'timestamp')
    return model
  }

  toString() {
    return JSON.stringify(this.createCacheData())
  }

}

export default CacheModel