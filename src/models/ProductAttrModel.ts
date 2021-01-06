import _ from 'lodash'

class ProductAttrModel {
  
  label: string;
  termcondition: string;

  constructor(json: any) {
    this.label = _.get(_.get(json, 'product'), 'label')
    this.termcondition = _.get(_.get(json, 'product'), 'termcondition')
  }
}

export default ProductAttrModel