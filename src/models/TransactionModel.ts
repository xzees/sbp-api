import _ from 'lodash'
import Validable from 'interface/Validable'
import ValidationModel from 'models/ValidationModel';

class TransactionModel implements Validable {
    uuid: string
    amount_fee: number
    amount_not_fee: number
    status: string
    
    constructor(json: any) {
        
        this.uuid = _.get(json, 'uuid')
        this.amount_fee = _.get(json, 'amount_fee')
        this.amount_not_fee = _.get(json, 'amount_not_fee')
        this.status = _.get(json, 'status')
    }

    validate(): ValidationModel {
        const validationModel = new ValidationModel()
        validationModel.isValid = true

        if (this.amount_not_fee == undefined) {
            validationModel.isValid = false
            validationModel.message = "Please specify `amount_not_fee`"
        }

        return validationModel
    }
}

export default TransactionModel