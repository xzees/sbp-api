import { Repository, SelectQueryBuilder } from 'typeorm'
import ProductChannelFee from '../database/entity/ProductChannelFee'
import databaseManager from 'manager/DatabaseManager'
import Product from 'database/entity/Product'
import Channel from 'database/entity/Channel'
import Fee from 'database/entity/Fee'

class ProductChannelFeeDatastore {
  repo: Repository<ProductChannelFee>

  constructor() {
    this.repo = databaseManager.connection.getRepository(ProductChannelFee)
  }

  getRepository(): SelectQueryBuilder<ProductChannelFee> {
    return this.repo.createQueryBuilder('product_channel_fee')
  }

  async findAndRelation(object: Object): Promise<ProductChannelFee[]> {
      return this.repo.find({
        relations: [
          'channel',
          'fee',
          'product',
          'product.product',
          'product.member'
        ],
        where: [
          {
            ...object
          }
        ]
      })
  }
  
  save(value: {
    product: Product,
    channel: Channel,
    fee: Fee
  }) {
    return this.repo.save(value)
  }
}

export default ProductChannelFeeDatastore
