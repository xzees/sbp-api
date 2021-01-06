import _ from 'lodash'
import MemberModel from './MemberModel';
import ProductModel from './ProductModel';

class ProductHasMemberModel {

  member: MemberModel
  product: ProductModel

  constructor(json: any) {
    this.member = new MemberModel(_.get(json, 'member'))
    this.product = new ProductModel(_.get(json, 'product'))
  }

}

export default ProductHasMemberModel