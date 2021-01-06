import _ from 'lodash'
import Validable from 'interface/Validable'
import ValidationModel from 'models/ValidationModel';
import PaymentListInfoGatewayModel from 'models/PaymentListInfoGatewayModel';
var crypto = require('crypto')

class PaymentListGatewayModel implements Validable {

    success_url: string
    fail_url: string
    order_code: string
    public_key: string
    page_lang?: string
    multi_amount: boolean
    info: PaymentListInfoGatewayModel | PaymentListInfoGatewayModel[]
    secure_hash: string 

    constructor(json: any) {
        this.success_url = _.get(json, 'success_url')
        this.fail_url = _.get(json, 'fail_url')
        this.order_code = _.get(json, 'orderRef')
        this.public_key = _.get(json, 'public_key')
        this.page_lang = _.get(json, 'page_lang')
        this.multi_amount = _.get(json, 'multi_amount') || false
        const info = _.get(json, 'info') || []
        
        this.secure_hash = _.get(json, 'secure_hash')
        
        if (Array.isArray(info)) {
            this.info = info.map(v => new PaymentListInfoGatewayModel(v));
        } else {
            this.info = new PaymentListInfoGatewayModel(info);
        }

    }

    validate(): ValidationModel {
        const validationModel = new ValidationModel()
        validationModel.isValid = true

        if (this.success_url == undefined) {
            validationModel.isValid = false
            validationModel.message = "Please specify `success_url`"
        }
        if (this.fail_url == undefined) {
            validationModel.isValid = false
            validationModel.message = "Please specify `fail_url`"
        }
        if (this.order_code == undefined) {
            validationModel.isValid = false
            validationModel.message = "Please specify `order_code`"
        }
        if (this.public_key == undefined) {
            validationModel.isValid = false
            validationModel.message = "Please specify `public_key`"
        }
        if (this.info == undefined || _.values(this.info).length == 0) {
            validationModel.isValid = false
            validationModel.message = "Please specify `info`"
        }

        return validationModel
    }
    
    checkSecureHash(secure_code: string): ValidationModel {
        const validationModel = new ValidationModel()
        validationModel.isValid = true

        const jsonEncode = JSON.stringify({
            public_key: this.public_key,
            order_code: this.order_code,
            success_url: this.success_url,
            fail_url: this.fail_url,
            info: this.info
        }) + '|' + secure_code
        const hashjsonEncode = crypto.createHash('sha512').update(jsonEncode).digest('hex');

        if(hashjsonEncode != this.secure_hash) {
            validationModel.isValid = false
            validationModel.message = "Please specify `secure_hash`"
        }

        return validationModel
    }
}

export default PaymentListGatewayModel