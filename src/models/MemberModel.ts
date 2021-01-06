import _ from 'lodash'
import MemberAttrModel from './MemberAttrModel';
import Validable from 'interface/Validable'
import ValidationModel from 'models/ValidationModel';

class MemberModel implements Validable {

  logo: string
  code: string
  attr: any
  uuid?: string
  constructor(json: any) {
    this.logo = _.get(json, 'logo')
    this.code = _.get(json, 'code')
    this.uuid = _.get(json, 'uuid')
    this.attr = _.mapValues(_.get(json, 'fieldLabel'), v => new MemberAttrModel(v))
  }

  validate(): ValidationModel {
      const validationModel = new ValidationModel()
      validationModel.isValid = true

      if (this.code == "undefined") {
          validationModel.isValid = false
          validationModel.message = "Please specify `code`"
      }

      if (this.logo == "undefined") {
          validationModel.isValid = false
          validationModel.message = "Please specify `logo`"
      }

      return validationModel
  }
}

export default MemberModel