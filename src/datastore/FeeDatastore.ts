import { Repository } from 'typeorm'
import databaseManager from 'manager/DatabaseManager'
import Fee from 'database/entity/Fee'

class FeeDatastore {
  repo: Repository<Fee>

  constructor() {
    this.repo = databaseManager.connection.getRepository(Fee)
  }

  fee() {
    return this.repo.createQueryBuilder('fee')
  }
 
}

export default FeeDatastore
