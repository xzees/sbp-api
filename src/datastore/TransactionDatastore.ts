import { Repository } from 'typeorm'
import databaseManager from 'manager/DatabaseManager'
import Transaction from 'database/entity/Transaction'

class TransactionDatastore {
  repo: Repository<Transaction>

  constructor() {
    this.repo = databaseManager.connection.getRepository(Transaction)
  }

  getRepo() {
    return this.repo.createQueryBuilder('transaction')
  }

  save(value: Transaction) {
    return this.repo.save(value);
  }

  findByUUid(uuid: string) {
    return this.repo.findOne({
      relations: [
        'product_channel_fee', 
        'info',
        'product_channel_fee.product',
        'product_channel_fee.product.product',
        'product_channel_fee.product.member',
        'product_channel_fee.channel'
      ],
      where: [{
        uuid: uuid
      }]
    })
  }
 
}

export default TransactionDatastore
