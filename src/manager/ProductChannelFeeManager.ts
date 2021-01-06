import Channel from 'database/entity/Channel'
import Fee from 'database/entity/Fee'
import Product from 'database/entity/Product'
import ProductChannelFee from 'database/entity/ProductChannelFee'
import ProductChannelFeeDatastore from 'datastore/ProductChannelFeeDatastore'

class ProductChannelFeeManager {

  productChannelFeeDatastore: ProductChannelFeeDatastore

  constructor() {
    this.productChannelFeeDatastore = new ProductChannelFeeDatastore()
  }

  async findAndRelation(value: Object): Promise<ProductChannelFee[]> {
      return this.productChannelFeeDatastore.findAndRelation(value)
  }

  async save(value: {
    product: Product,
    channel: Channel,
    fee: Fee
  }): Promise<ProductChannelFee | undefined> {
    return this.productChannelFeeDatastore.save(value)
  }
  
}

export default ProductChannelFeeManager
