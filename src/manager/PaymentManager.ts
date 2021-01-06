import _ from 'lodash'
import APIResponseModel from 'models/APIResponseModel';
import ProductManager from './ProductManager';
import ProductChannelFeeManager from './ProductChannelFeeManager';
import FeeModel from 'models/FeeModel';
import PaymentListGatewayModel from 'models/PaymentListGatewayModel';
import PaymentListInfoGatewayModel from 'models/PaymentListInfoGatewayModel';
import TransactionInfoModel from 'models/TransactionInfoModel';
import Transaction from 'database/entity/Transaction';
import TransactionInfoManager from './TransactionInfoManager';
import TransactionManager from './TransactionManager';
import PaymentListResponse from 'models/PaymentListResponse';
import PaymentFormGatewayModel from 'models/PaymentFormGatewayModel';
import ProductValueModel from 'models/ProductValueModel';
import MemberManager from './MemberManager';
import MemberValueModel from 'models/MemberValueModel';
import TransactionModel from 'models/TransactionModel';
import ConfigurationManager from './ConfigurationManager';

class PaymentManager {

  async listChannelByProduct(paymentListModel: PaymentListGatewayModel) {

    const apiResponse = new APIResponseModel()
    const responses: PaymentListResponse[] = []

    const valid = paymentListModel.validate()
    if (!valid.isValid) {
        apiResponse.status = 400
        apiResponse.message = valid.message
    }
    if(Array.isArray(paymentListModel.info)) {
        paymentListModel.info.forEach((v: PaymentListInfoGatewayModel) => {
            const valids = v.validatePaymentCode()
            if (!valids.isValid) {
                apiResponse.status = 400
                apiResponse.message = valids.message
            }
        })
    }else{
        const valid_info = paymentListModel.info.validate()   
        if (!valid_info.isValid) {
            apiResponse.status = 400
            apiResponse.message = valid_info.message
        }
    }
    
    if(apiResponse.status == 400) {
        return apiResponse;
    }
    
    const productManager = new ProductManager() 
    const getProduct = await productManager.findByPublicKey(paymentListModel.public_key)
    if(!getProduct) {
        apiResponse.status = 400
        apiResponse.message = 'Please specify `public_key`'
        return apiResponse
    }
    
    const validSecureCode = paymentListModel.checkSecureHash(getProduct.secure_key)
    if (!validSecureCode.isValid) {
        apiResponse.status = 400
        apiResponse.message = validSecureCode.message
        return apiResponse
    }
    
    const productChannelFeeManager = new ProductChannelFeeManager()

    const transactionInfoManager = new TransactionInfoManager()
    const transactionInfoModel = new TransactionInfoModel({
        ...paymentListModel,
        secure_code: paymentListModel.public_key
    })
    const transactonInfo = await transactionInfoManager.findOrCreate(transactionInfoModel)

    if(transactonInfo.transaction && transactonInfo.transaction.length > 0) {
        for(const transaction of transactonInfo.transaction) {
            const paymentListResponse = new PaymentListResponse({ 
                fee: transaction.fee,
                amount: transaction.amount_not_fee,
                form_url: transaction.product_channel_fee.channel.frontend_url,
                icon: transaction.product_channel_fee.channel.icon,
                channel: transaction.product_channel_fee.channel.code,
                secureKey: transaction.uuid
            })
            responses.push(paymentListResponse)
        }
        return responses
    }

    const getAllChannel = await productChannelFeeManager.findAndRelation({
        product: getProduct
    })

    const transactionManager = new TransactionManager()
    for(const productChannelFee of getAllChannel) {
        const feeModel = new FeeModel(productChannelFee.fee)
        let amountByInfo: number;
        if(!Array.isArray(paymentListModel.info)) {
            amountByInfo = paymentListModel.info.amount
        }else{
            const mapChannel = await _.find(paymentListModel.info,(v: PaymentListInfoGatewayModel) => {
                return v.payment_code == productChannelFee.channel.code;
            })
            amountByInfo = mapChannel.amount
        }   
         
        const amount = feeModel.getMarkupPrice(amountByInfo)
        const transaction = new Transaction()
        transaction.amount_fee = amount
        transaction.amount_not_fee = amountByInfo
        transaction.fee = transaction.amount_fee - transaction.amount_not_fee
        transaction.product_channel_fee = productChannelFee
        transaction.info = transactonInfo
        
        const transactionLastSave = await transactionManager.save(transaction)
        const paymentListResponse = new PaymentListResponse({ 
            fee: transactionLastSave.fee,
            form_url: productChannelFee.channel.frontend_url,
            icon: productChannelFee.channel.icon,
            channel: productChannelFee.channel.code,
            secureKey: transactionLastSave.uuid
        })
        responses.push(paymentListResponse)
    
    }


    return responses
  }

  async getFormPaymentBySecureKey(paymentFormGatewayModel: PaymentFormGatewayModel) {
    const apiResponse = new APIResponseModel()
    const dataResponse: any[] = []
    const valid = paymentFormGatewayModel.validate()
    if (!valid.isValid) {
        apiResponse.status = 400
        apiResponse.message = valid.message
        return apiResponse
    }

    const transactionManager = new TransactionManager()
    const transation = await transactionManager.transactionDatastore.findByUUid(paymentFormGatewayModel.secure_key)
    if(!transation) {
        apiResponse.status = 400
        apiResponse.message = 'secureKey not find'
        return apiResponse
    }

    const productManager = new ProductManager()
    const memberManager = new MemberManager()

    const valueProduct = await productManager.productDatastore.getValueById(transation.product_channel_fee.product.product.id)
    const valueMember = await memberManager.memberDatastore.getValueById(transation.product_channel_fee.product.member.id)
    
    const getMember  = transation.product_channel_fee.product.member
    const getProduct  = transation.product_channel_fee.product.product
    const mapProduct = await valueProduct.map(v => new ProductValueModel(v))
    const mapMember = await valueMember.map(v => new MemberValueModel(v))
    const getTransationInfo = new TransactionInfoModel(transation.info)
    const getTransation = new TransactionModel(transation)


    return {
        transaction: {
            ...getTransationInfo,
            success_url: ConfigurationManager.default.getConfig('baseurl') + '/payment/transaction?secureKey='+paymentFormGatewayModel.secure_key,
            fail_url: ConfigurationManager.default.getConfig('baseurl') + '/payment/transaction?secureKey='+paymentFormGatewayModel.secure_key,
            value: getTransation
        },
        member: {
            ...getMember,
            value: mapMember
        },
        product: {
            ...getProduct,
            value: mapProduct
        },
        
    }

  }
}

export default PaymentManager
