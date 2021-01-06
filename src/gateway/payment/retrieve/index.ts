import express, {
    Response
} from 'express'
import RetrieveManager from 'manager/RetrieveManager'
import APIJSONResponse from 'models/APIJSONResponse'

const PaymentRetrieve = express()

PaymentRetrieve.get('/', async (req: any, res: Response) => {
    
    const retrieve = new RetrieveManager()
    const retrieveData = await retrieve.getBookingInfo(req.query.orderRef, req.query.channel)

    return res.status(200).json(APIJSONResponse.create(retrieveData))

})

export default PaymentRetrieve