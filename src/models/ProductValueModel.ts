import _ from 'lodash'
import ProductModel from './ProductModel';

class ProductValueModel {

    value: string
    code_lang: string
    active: string
    product: ProductModel
    label: string

    constructor(json: any) {
        this.value = _.get(json, 'value');
        this.code_lang = _.get(json, 'code_lang');
        this.active = _.get(json, 'active');
        this.label =  _.get(json, 'product_attribute.code');
    }
}

export default ProductValueModel