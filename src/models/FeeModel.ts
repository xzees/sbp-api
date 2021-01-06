import _ from 'lodash'
import Validable from 'interface/Validable'
import ValidationModel from 'models/ValidationModel';
import { FeeTypeEnum } from 'enum/FeeTypeEnum';

class FeeModel implements Validable {

  value: number
  type: string
  constructor(json: any) {
    this.value = _.get(json, 'value')
    this.type = _.get(json, 'type')
  }

  getMarkupPrice(basePrice: number): number {

    switch (this.type) {
      case FeeTypeEnum.per:
        return basePrice * ((100.0 + this.value) / 100.0)
      case FeeTypeEnum.amo:
        return basePrice + this.value
      default:
        return basePrice
    }
  }

  validate(): ValidationModel {
      const validationModel = new ValidationModel()
      validationModel.isValid = true

      if (this.value == undefined) {
          validationModel.isValid = false
          validationModel.message = "Please specify `value`"
      }

      if (this.type == "undefined") {
          validationModel.isValid = false
          validationModel.message = "Please specify `type`"
      }

      return validationModel
  }
}

export default FeeModel