import _ from 'lodash'
import Validable from 'interface/Validable'
import ValidationModel from 'models/ValidationModel';
import FeeModel from './FeeModel';

class ChannelModel implements Validable {

  code: string
  group_code?: string
  frontend_url?: string
  payment_url?: string
  icon?: string
  fee?: FeeModel
  constructor(json: any) {
    this.code = _.get(json, 'code')
    this.group_code = _.get(json, 'group_code')
    this.frontend_url = _.get(json, 'frontend_url')
    this.payment_url = _.get(json, 'payment_url')
    this.icon = _.get(json, 'icon')
    this.fee = new FeeModel(_.get(json, 'fee'))
  }

  validate(): ValidationModel {
      const validationModel = new ValidationModel()
      validationModel.isValid = true

      if (this.code == undefined) {
          validationModel.isValid = false
          validationModel.message = "Please specify `code`"
      }

      if (this.group_code == undefined) {
          validationModel.isValid = false
          validationModel.message = "Please specify `group_code`"
      }

      if (this.frontend_url == undefined) {
          validationModel.isValid = false
          validationModel.message = "Please specify `frontend_url`"
      }

      if (this.payment_url == undefined) {
          validationModel.isValid = false
          validationModel.message = "Please specify `payment_url`"
      }

      if (this.icon == undefined) {
          validationModel.isValid = false
          validationModel.message = "Please specify `icon`"
      }

      return validationModel
  }

  toResponse() {
      return {
        code: this.code,
        group_code: this.group_code,
        frontend_url: this.frontend_url,
        payment_url: this.payment_url,
        icon: this.icon,
      }
  }
}

export default ChannelModel