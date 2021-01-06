import express, {
    Request,
    Response
} from 'express'
import _ from 'lodash'
import PaymentManager from 'manager/PaymentManager'
import APIJSONResponse from 'models/APIJSONResponse'
import PaymentListGatewayModel from 'models/PaymentListGatewayModel'

const PaymentList = express()

/**
 * @swagger
 *
 * /payment/list:
 *   post:
 *     tags:
 *      - "Payment"
 *     summary: Get Payment List
 *     description: Get Payment List 
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: list
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             public_key:
 *               type: string
 *             page_lang:
 *               type: string
 *             multi_amount:
 *               type: boolean
 *             order_code:
 *               type: string
 *             success_url:
 *               type: string
 *             fail_url:
 *               type: string
 *             info:
 *               type: object
 *               properties:
 *                  amount:
 *                      type: number
 *                      multipleOf: 0.01
 *             secure_hash:
 *               type: string
 *           example:
 *             public_key: 5a9d4ffd-802a-4fcf-a047-a4fda1b1ba0e
 *             page_lang: th
 *             multi_amount: false
 *             order_code: TTC2020S1
 *             success_url: http://localhost/success
 *             fail_url: http://localhost/fail
 *             info: 
 *                amount: 7777.00
 *             secure_hash: ed42e74af56737283b72b4273430816353bb8e6a07fc75180798bf6d25d0d939aa9981802d98949dd33c1b94fe9f0ffc0a8dd2f313a867d85c2bd3e48dc71ff7
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         schema:
 *           example:
 *             status: 200,
 *             data: []
 *             requestId: "ab029b0d-ed41-4bc4-9073-3e09b1d30dfb"
 *       "400":
 *         description: "Invalid status value"
 * 
 * /payment/lists:
 *   post:
 *     tags:
 *      - "Payment"
 *     summary: Get Payment List (Multi Amount)
 *     description: Get Payment List (Multi Amount)
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: list (multi amount)
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             secure_code:
 *               type: string
 *             page_lang:
 *               type: string
 *             multi_amount:
 *               type: boolean
 *             order_code:
 *               type: string
 *             success_url:
 *               type: string
 *             fail_url:
 *               type: string
 *             info:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   amount:
 *                      type: number
 *                      multipleOf: 0.01
 *                   payment_code:
 *                      type: string
 *           example:
 *             secure_code: 754f2c66-06ac-4244-829e-4c394810e8fa
 *             page_lang: th
 *             multi_amount: true
 *             order_code: TTC2020S1
 *             success_url: http://localhost/success
 *             fail_url: http://localhost/fail
 *             info: 
 *                - amount: 7777.00
 *                  payment_code: visa
 *                - amount: 7777.00
 *                  payment_code: master
 *             
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         schema:
 *           example:
 *             status: 200,
 *             data: []
 *             requestId: "ab029b0d-ed41-4bc4-9073-3e09b1d30dfb"
 *       "400":
 *         description: "Invalid status value"
 */

PaymentList.post('/', async (req: Request, res: Response) => {


    const paymentListModel = new PaymentListGatewayModel(req.body)
    const paymentManager = new PaymentManager()

    const paymentList = await paymentManager.listChannelByProduct(paymentListModel)
    if(_.get(paymentList, 'status') == 400) {
        res.status(400).json({...paymentList})
    }

    return res.json(APIJSONResponse.create({
        data: paymentList
      }).toAPIResponse())
})

export default PaymentList