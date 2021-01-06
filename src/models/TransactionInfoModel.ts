import _ from 'lodash'
import moment from 'moment'
import ConfigurationManager from 'manager/ConfigurationManager';

class TransactionInfoModel {

    success_url: string
    fail_url: string
    order_code: string
    secure_code: string
    page_lang?: string
    multi_amount: boolean
    expired_at: Date
  
    constructor(json: any) {
        this.success_url = _.get(json, 'success_url')
        this.fail_url = _.get(json, 'fail_url')
        this.order_code = _.get(json, 'order_code')
        this.secure_code = _.get(json, 'secure_code')
        this.page_lang = _.get(json, 'page_lang')
        this.multi_amount = _.get(json, 'multi_amount') || false   
        this.expired_at = moment().add(
            ConfigurationManager.default.getConfig('transaction_expired') || 10, 
            'minutes'
        ).toDate()
    }
}

export default TransactionInfoModel