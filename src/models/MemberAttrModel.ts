import _ from 'lodash'

class MemberAttrModel {
  
  name: string
  address: string

  constructor(json: any) {
    this.name = _.get(json, 'name')
    this.address = _.get(json, 'address')
  }
}

export default MemberAttrModel