import APIResponseModel from 'models/APIResponseModel';
import TransactionInfoManager from './TransactionInfoManager';

class RetrieveManager {

  async getBookingInfo(orderRef: string, channelcode: string) {
    const transaction = new TransactionInfoManager()
    const transactionInfo = await transaction.transactionInfoDatastore.repo.findOne({
        relations: [
            'transaction', 
            'transaction.product_channel_fee', 
            'transaction.product_channel_fee.channel'
        ],
        where: {
            order_code: orderRef
        }
    })
    const apiResponse = new APIResponseModel()
    if (!transactionInfo) {
        apiResponse.status = 400
        apiResponse.message = ''
        return apiResponse
    }
    
    const transactionModel = transactionInfo.transaction.find(v => {
        return v.product_channel_fee.channel.code == channelcode
    })
    
    return transactionModel
  }
  
}

export default RetrieveManager
