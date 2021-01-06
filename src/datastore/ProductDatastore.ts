import { Like, Repository } from 'typeorm'
import Product from '../database/entity/Product'
import ProductAttribute from '../database/entity/ProductAttribute'
import ProductValue from '../database/entity/ProductValue'
import databaseManager from 'manager/DatabaseManager'
import _ from 'lodash'
import ProductModel from 'models/ProductModel'

class ProductDatastore {
  repoProduct: Repository<Product>
  repoAttribute: Repository<ProductAttribute> 
  repoValue: Repository<ProductValue>

  constructor() {
    this.repoProduct = databaseManager.connection.getRepository(Product)
    this.repoAttribute = databaseManager.connection.getRepository(ProductAttribute)
    this.repoValue = databaseManager.connection.getRepository(ProductValue)
  }

  product() {
    return this.repoProduct.createQueryBuilder('product')
  }
  
  attr() {
    return this.repoAttribute.createQueryBuilder('product_attribute')
  }

  value() {
    return this.repoValue.createQueryBuilder('product_value')
  }

  async save(value: ProductModel): Promise<Product | undefined> {
    const new_value_product: ProductValue[] = await Promise.all(
        _.map(value.attr, async (vLang: string, kLang: string) => {
          return await Promise.all(_.map(vLang, async (v, k)  => {
            return {
              product_attribute: {
                ...await this.repoAttribute.findOne({
                  code: k,
                  active: 'y'
                }),
                code: k,
              },
              code_lang: kLang,
              value: v
            }
          }))
      })
    )
    const mapValue = new_value_product.flat(1);
    const product = await this.repoProduct.findOne({
      code: value.code,
      active: 'y'
    })

    if(!product) {
      return this.repoProduct.save({
        value: mapValue,
        code: value.code,
        callback_url: value.callback_url
      })
    }

    const mapValueProduct = await mapValue.map(v=>{
      return {
        ...v,
        product: product
      }
    })
    await this.repoValue.save(mapValueProduct)
    return this.repoProduct.findOne({
      code: value.code,
      active: 'y'
    })
  }
  
  async delete(code: string) {
    const findCode = (await this.repoProduct.findOne({
      where: {
        code: code
      }
    }))
    if(findCode == undefined) return undefined
    return this.repoProduct.update(findCode.id ,{
      code: code,
      active: 'n'
    })
  }

  async findByCode(code: string): Promise<Product | undefined> {
    return this.repoProduct.findOne({
        relations: ['value', 'value.product_attribute'],
        where: [{
          code: code,
          active: 'y'
        }]
    });
  }

  async findByPublicKey(public_key: string): Promise<Product | undefined> {
    return this.repoProduct.findOne({
        relations: ['value', 'value.product_attribute'],
        where: [{
          public_key: public_key,
          active: 'y'
        }]
    });
  }

  async findByAttr(field: string, value: string): Promise<ProductValue[]> {
    return this.repoValue.find({
        relations: ['product', 'product_attribute'],
        where: [{
            value: Like(`%${value}%`),
            product_attribute: (await this.repoAttribute.findOne({code: field}))!.id
        }]
    });
  }

  async getValueById(id: number): Promise<ProductValue[]> {
    return this.repoValue.find({
        relations: ['product', 'product_attribute'],
        where: [{
            product: id,
        }]
    });
  }
}

export default ProductDatastore
