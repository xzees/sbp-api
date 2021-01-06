import _ from 'lodash'

class Response {
  success: boolean = true
  data: any

  constructor(data: any) {
    const successJSON = _.get(data, 'success')
    this.success = (successJSON == 'true' || successJSON == '1')
    this.data = data
  }
}

export default Response