import express, {
    Response
} from 'express'
import TransactionManager from 'manager/TransactionManager'
import PaymentFormGatewayModel from 'models/PaymentFormGatewayModel'

const PaymentTransaction = express()

PaymentTransaction.get('/', async (req: any, res: Response) => {


    const transactionManager = new TransactionManager()
    const paymentFormGatewayModel = new PaymentFormGatewayModel(req.query)
    const transation = await transactionManager.transactionDatastore.findByUUid(paymentFormGatewayModel.secure_key)
    if(!transation) {
        return res.status(400).json({
            message: 'not find transaction'
        })
    }
    if(transation.status == 'n') {
        res.status(302).redirect(transation.info.fail_url)
    }
    res.status(302).redirect(transation.info.success_url)
    
})

export default PaymentTransaction