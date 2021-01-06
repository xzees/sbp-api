import _ from 'lodash'
import Validable from 'interface/Validable'
import ValidationModel from 'models/ValidationModel';

class PaymentListInfoGatewayModel implements Validable {

    amount: number
    payment_code?: string

    constructor(json: any) {
        this.amount = _.get(json, 'amount')
        this.payment_code = _.get(json, 'payment_code')
    }

    validate(): ValidationModel {
        const validationModel = new ValidationModel()
        validationModel.isValid = true

        if (this.amount == undefined) {
            validationModel.isValid = false
            validationModel.message = "Please specify `amount`"
        }

        return validationModel
    }

    validatePaymentCode(): ValidationModel {
        const validationModel = new ValidationModel()
        validationModel.isValid = true

        if (this.payment_code == undefined) {
            validationModel.isValid = false
            validationModel.message = "Please specify `payment_code`"
        }

        if (this.amount == undefined) {
            validationModel.isValid = false
            validationModel.message = "Please specify `amount`"
        }

        return validationModel
    }
}

export default PaymentListInfoGatewayModel