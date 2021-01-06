import express from 'express'
import ChannelManager from 'manager/ChannelManager';
import ProductManager from 'manager/ProductManager';
import RegisterManager from 'manager/RegisterManager';
import ChannelModel from 'models/ChannelModel';
import MemberModel from 'models/MemberModel';
import ProductModel from 'models/ProductModel';

const Mockup = express()

/**
 * @swagger
 *
 *  /mockup/createMember:
 *    post:
 *      tags:
 *       - "Mockup"
 *      summary: Mockup Member
 *      description: Mockup Member
 *      consumes:
 *        - application/json 
 *      parameters:
 *        - name: list
 *          in: body
 *          schema:
 *            type: object
 *            properties:
 *              logo:
 *                type: string
 *              code:
 *                type: string
 *              product:
 *                type: object
 *                properties:
 *                  callback_url:
 *                    type: string
 *                  code:
 *                    type: string
 *              fieldLabel:
 *                type: object
 *                properties:
 *                  th:
 *                    type: object
 *                    properties:
 *                      name:
 *                        type: string
 *                      address:
 *                        type: string
 *                      product:
 *                        type: object
 *                        properties:
 *                          label:
 *                            type: string
 *                          termcondition:
 *                            type: string
 *            example: 
 *              logo: 'https://www.thaitravelcenter.com/about/images/corporate-identity.jpg'
 *              code: 'ttc'
 *              product:
 *                callback_url: 'https://www.thaitravelcenter.com/callback'
 *                code: 'hotel'
 *              fieldLabel:
 *                th:
 *                  address: '3455 อาคารทีทีซี พาร์ค ทาวเวอร์ ชั้น 4 ถนนพระราม 9 แขวงสวนหลวง เขตสวนหลวง กรุงเทพมหานคร 10250'
 *                  name: 'Thai Travel Center'
 *                  product:
 *                    label: 'จองโรงแรม'
 *                    termcondition: 'https://www.thaitravelcenter.com/termcondition/'
 *      responses:
 *        "200":
 *          description: "successful operation"
 *          schema:
 *            example:
 *              status: 200,
 *              data: []
 *              requestId: "ab029b0d-ed41-4bc4-9073-3e09b1d30dfb"
 *        "400":
 *          description: "Invalid status value"
 *
 */

Mockup.post('/createMember', async (req, res) => {

    const ttcMockup = req.body
    try{

      const registerMemberModel = new MemberModel(ttcMockup)
      const registerProductModel = new ProductModel(ttcMockup)
      const response = await (new RegisterManager).registerMemberAndProduct(registerMemberModel, registerProductModel)
      return res.json(response.toAPIResponse())
    }catch(e) {
      return res.json({
        status: 400,
        message: e
      })
    }
})

/**
 * @swagger
 * 
 *  /mockup/createChannel:
 *    post:
 *      tags:
 *       - "Mockup"
 *      summary: Mockup Channel
 *      description: Mockup Channel
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: list
 *          in: body
 *          schema:
 *            type: object
 *            properties:
 *              code:
 *                type: string
 *              group_code:
 *                type: string
 *              frontend_url:
 *                type: string
 *              payment_url:
 *                type: string
 *              icon:
 *                type: string
 *            example: 
 *              code: 'credit'
 *              group_code: 'CREDIT_CARD'
 *              frontend_url: 'http://localhost:5000/test'
 *              payment_url: 'http://localhost:5000/test'
 *              icon: 'https://assets.travizgo.com/development/web/common/payment-methods/credit-card-icons/mastercard.png'
 *      responses:
 *        "200":
 *          description: "successful operation"
 *          schema:
 *            example:
 *              status: 200,
 *              data: []
 *              requestId: "ab029b0d-ed41-4bc4-9073-3e09b1d30dfb"
 *        "400":
 *          description: "Invalid status value"
 */
Mockup.post('/createChannel', async (req, res) => {
  const channelMaster = req.body

  const channelManager = new ChannelManager()

  const registerChannelModel = new ChannelModel(channelMaster)
  await channelManager.save(registerChannelModel)

  return res.json({
    status: 200
  })

});


/** 
  * @swagger
  * /mockup/addChanneltoMember:
  *    post:
  *      tags:
  *       - "Mockup"
  *      summary: Mockup Channel to member
  *      description: Mockup Channel to member
  *      consumes:
  *        - application/json
  *      parameters:
  *        - name: list
  *          in: body
  *          schema:
  *            type: object
  *            properties:
  *              product:
  *                type: object
  *                properties:
  *                  secureCode:
  *                    type: string
  *              channel:
  *                type: array
  *                items:
  *                  type: object
  *                  properties:
  *                    fee:
  *                      type: object
  *                      properties:
  *                        value:
  *                          type: number
  *                        type: 
  *                          type: string
  *                    code: 
  *                      type: string
  *            example: 
  *               product: 
  *                 public_key: 
  *               channel: 
  *                   - fee: 
  *                       value: 0
  *                       type: THB
  *                     code: credit
  *      responses:
  *        "200":
  *          description: "successful operation"
  *          schema:
  *            example:
  *              status: 200,
  *              data: []
  *              requestId: "ab029b0d-ed41-4bc4-9073-3e09b1d30dfb"
  *        "400":
  *          description: "Invalid status value"
  */



Mockup.post('/addChanneltoMember', async (req, res) => {

  const registerManager = new RegisterManager();
  const ttcMockup = req.body

  const productModel = new ProductModel(ttcMockup)
  const channelModel = ttcMockup.channel.map(v => new ChannelModel(v));

  await registerManager.registerChannelToProduct(productModel, channelModel)
  
  return res.json({
    status: 200
  })
})


/** 
  * @swagger
  * /mockup/getAllProduct:
  *    post:
  *      tags:
  *       - "Mockup"
  *      summary: Mockup get Product
  *      description: Mockup get Product
  *      consumes:
  *        - application/json
  *      responses:
  *        "200":
  *          description: "successful operation"
  *          schema:
  *            example:
  *              status: 200,
  *              data: []
  *              requestId: "ab029b0d-ed41-4bc4-9073-3e09b1d30dfb"
  *        "400":
  *          description: "Invalid status value"
  */
Mockup.post('/getAllProduct', async (req, res) => {

  const productManager = new ProductManager();
  const data = await productManager.productDatastore.repoProduct.find({
    relations: ['value', 'value.product_attribute'],
    where: {
      active: 'y'
    }
  })
  return res.json({
    status: 200,
    data: [...data]
  })
})

export default Mockup