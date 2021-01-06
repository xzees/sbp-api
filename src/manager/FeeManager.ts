import Fee from 'database/entity/Fee'
import FeeDatastore from 'datastore/FeeDatastore'
import FeeModel from 'models/FeeModel'

class FeeManager {
  FeeDatastore: FeeDatastore = new FeeDatastore()

  constructor() {
    this.FeeDatastore = new FeeDatastore()
  }

  async save(entity: Fee) {
    return this.FeeDatastore.repo.save(entity)
  }

  async findOne(entity) {
    return this.FeeDatastore.repo.findOne(entity)
  }

  async findOrCreate(entity: FeeModel) {
    const count = await this.FeeDatastore.repo.findOne({
      where: [{...entity}]
    })
    if(!count) {
      return this.FeeDatastore.repo.save(entity) 
    }
    return this.FeeDatastore.repo.findOne(entity)
  }
}

export default FeeManager
