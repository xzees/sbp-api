import ValidationModel from 'models/ValidationModel';
import _ from 'lodash'
import Validable from 'interface/Validable';

class ValidationManager {
  static default: ValidationManager = new ValidationManager()

  private constructor() { }

  isAllValid(validables: Validable[]): ValidationModel {
    const validationModels = validables.map(x => x.validate())
    const isValid = _.every(validationModels.map(x => x.isValid), x => x)
    const message = _.head(_.compact(validationModels.map(x => x.message)))
    const validationModel = new ValidationModel()
    validationModel.isValid = isValid
    validationModel.message = message
    return validationModel
  }
}

export default ValidationManager