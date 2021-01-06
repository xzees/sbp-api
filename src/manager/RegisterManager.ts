import MemberManager from './MemberManager';
import MemberModel from 'models/MemberModel';
import ProductModel from 'models/ProductModel';
import APIResponseModel from 'models/APIResponseModel';
import ProductManager from './ProductManager';
import ProductHasMemberManager from './ProductHasMemberManager';
import ProductChannelFeeManager from './ProductChannelFeeManager';
import ChannelModel from 'models/ChannelModel';
import ChannelManager from './ChannelManager';
import FeeManager from './FeeManager';
import FeeModel from 'models/FeeModel';

class RegisterManager {

  async registerMemberAndProduct(member: MemberModel, product: ProductModel): Promise<APIResponseModel> {

    const apiResponse = new APIResponseModel()
    const validMember = member.validate()
    if (!validMember.isValid) {
        apiResponse.status = 400
        apiResponse.message = validMember.message
        return apiResponse
    }

    const validProduct = product.validate()
    if (!validProduct.isValid) {
        apiResponse.status = 400
        apiResponse.message = validProduct.message
        return apiResponse
    }

    const memberManager = new MemberManager()
    let getMember = await memberManager.findByCode(member.code)
    
    if(!getMember) {
        getMember = await memberManager.save(member);
    }

    const productManager = new ProductManager()
    let getProduct = await productManager.findByCode(product.code)
    if(!getProduct) {
      getProduct = await productManager.save(product);
    }

    const productHasMemberManager = new ProductHasMemberManager()
    const findPHM = await productHasMemberManager.productHasMemberDatastore.repo.findOne({
      member: getMember,
      product: getProduct
    })

    if(!findPHM) {
      productHasMemberManager.save({
        member: getMember,
        product: getProduct
      })
    }

    return apiResponse 
  }

  async registerChannelToProduct(product: ProductModel, channel: ChannelModel[]) {
      const productManager = new ProductManager()
      const channelManager = new ChannelManager()
      const feeManager = new FeeManager()
      const productChannelFeeManager = new ProductChannelFeeManager()

      const apiResponse = new APIResponseModel()
      
      if(product.public_key == undefined) {
        apiResponse.status = 400
        apiResponse.message = 'not find secureCode'
        return apiResponse 
      }

      const getProduct = await productManager.findByPublicKey(product.public_key) 
      for(const channelValue of channel) {
        const getChannel = await channelManager.findByCode(channelValue.code)
        const getFee = await feeManager.findOrCreate(channelValue.fee || {} as FeeModel)
        
        if(getProduct && getChannel && getFee) {
          let findOne = await productChannelFeeManager.productChannelFeeDatastore.repo.findOne({
            product: getProduct,
            channel: getChannel,
            fee: getFee
          })
          if(!findOne) {
            findOne = await productChannelFeeManager.save({
              product: getProduct,
              channel: getChannel,
              fee: getFee
            })
          }
        }
      }
      apiResponse.status = 200
      return apiResponse 
  }
}

export default RegisterManager
