import _ from 'lodash'
import ProductAttrModel from './ProductAttrModel';
import ValidationModel from './ValidationModel';

class ProductModel {

  code: string
  callback_url: string
  attr: any
  public_key?: string
  constructor(json: any) {
    this.code = _.get(_.get(json, 'product'), 'code')
    this.callback_url = _.get(_.get(json, 'product'), 'callback_url')
    this.public_key = _.get(_.get(json, 'product'), 'public_key')
    this.attr = _.mapValues(_.get(json, 'fieldLabel'), v => new ProductAttrModel(v))
  }

  validate(): ValidationModel {
    const validationModel = new ValidationModel()
    validationModel.isValid = true

    if (this.code == "undefined") {
        validationModel.isValid = false
        validationModel.message = "Please specify `code`"
    }

    if (this.callback_url == "undefined") {
        validationModel.isValid = false
        validationModel.message = "Please specify `callback_url`"
    }

    return validationModel
  }
}

export default ProductModel