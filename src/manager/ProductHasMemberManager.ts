import ProductHasMember from 'database/entity/ProductHasMember'
import ProductHasMemberDatastore from 'datastore/ProductHasMemberDatastore'

class ProductHasMemberManager {

    productHasMemberDatastore: ProductHasMemberDatastore

  constructor() {
    this.productHasMemberDatastore = new ProductHasMemberDatastore()
  }

  async save(value: any): Promise<ProductHasMember | undefined> {
    return this.productHasMemberDatastore.save(value)
  }
  
}

export default ProductHasMemberManager
