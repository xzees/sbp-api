import _ from 'lodash'
import Validable from 'interface/Validable'
import ValidationModel from 'models/ValidationModel';

class PaymentFormGatewayModel implements Validable {

    secure_key: string

    constructor(json: any) {
      this.secure_key = _.get(json, 'secureKey')
    }

    validate(): ValidationModel {
        const validationModel = new ValidationModel()
        validationModel.isValid = true

        if (this.secure_key == undefined) {
            validationModel.isValid = false
            validationModel.message = "Please specify `secure_key`"
        }

        return validationModel
    }
}

export default PaymentFormGatewayModel