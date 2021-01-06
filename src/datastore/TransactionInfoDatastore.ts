import { Repository } from 'typeorm'
import databaseManager from 'manager/DatabaseManager'
import TransactionInfo from 'database/entity/TransactionInfo'
import TransactionInfoModel from 'models/TransactionInfoModel'

class TransactionInfoDatastore {
  repo: Repository<TransactionInfo>

  constructor() {
    this.repo = databaseManager.connection.getRepository(TransactionInfo)
  }

  async save(entity: TransactionInfoModel) {
    return this.repo.save(entity)
  }

  getRepo() {
    return this.repo.createQueryBuilder('transaction_info')
  }
 
}

export default TransactionInfoDatastore
