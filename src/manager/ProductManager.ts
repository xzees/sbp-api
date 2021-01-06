import Product from 'database/entity/Product'
import ProductDatastore from 'datastore/ProductDatastore'
import ProductModel from 'models/ProductModel'

class ProductManager {

  productDatastore: ProductDatastore

  constructor() {
    this.productDatastore = new ProductDatastore()
  }

  async save(value: ProductModel): Promise<Product | undefined> {
    return this.productDatastore.save(value)
  }

  async findByCode(value: string): Promise<Product | undefined> {
    return this.productDatastore.findByCode(value)
  }

  async findByPublicKey(public_key: string): Promise<Product | undefined> {
    return this.productDatastore.findByPublicKey(public_key)
  }
  
}

export default ProductManager
