import APICallbackRequest from 'API/APICallbackRequest';
import express, {
    Response
} from 'express'
import APIManager from 'common/Manager/APIManager';
import TransactionInfoManager from 'manager/TransactionInfoManager'

const PaymentSuccess = express()

const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true })

PaymentSuccess.post('/:channel',urlencodedParser, async (req: any, res: Response) => {

    const channelCode = req.params.channel;
    const orderRef = req.body.orderRef
    
    const transaction = new TransactionInfoManager()
    const transactionAfterSuccess = await transaction.updateTransaction(orderRef, 'n' , channelCode)
    if(transactionAfterSuccess) {
        const endpoint = transactionAfterSuccess.product_channel_fee.product.product.callback_url

        const model = {
            code: '01',
            message: 'Card No Verify',
            channel: channelCode,
            orderRef: orderRef,
            amount: transactionAfterSuccess.amount_not_fee
        }
        
        const service = new APICallbackRequest(endpoint, model)
        await APIManager.default.fetch(service)
        res.status(200).json({
            message: 'success'
        }) 
    }

    res.status(400).json({})
    
})

export default PaymentSuccess