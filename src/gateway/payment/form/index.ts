import express, {
    Request,
    Response
} from 'express'
import _ from 'lodash'
import PaymentManager from 'manager/PaymentManager'
import APIJSONResponse from 'models/APIJSONResponse'
import PaymentFormGatewayModel from 'models/PaymentFormGatewayModel'

const PaymentForm = express()

/**
 * @swagger
 *
 * /payment/form:
 *      post:
 *        tags:
 *         - "Payment"
 *        summary: Get Payment Form
 *        description: Get Payment ListForm
 *        consumes:
 *          - application/json
 *        parameters:
 *          - name: list
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                secureKey: 
 *                  type: string
 *        responses:
 *          "200":
 *            description: "successful operation"
 *            schema:
 *              example:
 *                status: 200,
 *                data: []
 *                requestId: "ab029b0d-ed41-4bc4-9073-3e09b1d30dfb"
 * 
 */

const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true })


PaymentForm.post('/', urlencodedParser , async (req: Request, res: Response) => {
    const paymentFormGatewayModel = new PaymentFormGatewayModel(req.body)
    const paymentManager = new PaymentManager();
    const data = await paymentManager.getFormPaymentBySecureKey(paymentFormGatewayModel)
    
    if(_.get(data, 'status') == 400) {
        res.status(400).json({...data})
    }

    return res.json(APIJSONResponse.create(data).toAPIResponse())
   
})

export default PaymentForm