import { Repository, SelectQueryBuilder } from 'typeorm'
import ProductHasMember from '../database/entity/ProductHasMember'
import databaseManager from 'manager/DatabaseManager'
class ProductHasMemberDatastore {
  repo: Repository<ProductHasMember>

  constructor() {
    this.repo = databaseManager.connection.getRepository(ProductHasMember)
  }

  getRepository(): SelectQueryBuilder<ProductHasMember> {
    return this.repo.createQueryBuilder('product_has_member')
  }
  
  save(value: ProductHasMember) {
    return this.repo.save(value)
  }

}

export default ProductHasMemberDatastore
