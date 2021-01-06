import _ from 'lodash'

class PaymentListResponse {
  
    fee: number
    amount: number
    form_url: string
    icon: string
    label: string
    secureKey: string
    channel: string

    constructor(json: any) {
        this.fee = _.get(json, 'fee')
        this.amount = _.get(json, 'amount')
        this.form_url = _.get(json, 'form_url')
        this.icon = _.get(json, 'icon')
        this.label = _.get(json, 'label')
        this.secureKey = _.get(json, 'secureKey')
        this.channel = _.get(json, 'channel')
    }
}

export default PaymentListResponse