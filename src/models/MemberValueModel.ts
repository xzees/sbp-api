import _ from 'lodash'
import MemberModel from './MemberModel';

class MemberValueModel {

    value: string
    code_lang: string
    active: string
    member: MemberModel
    label: string

    constructor(json: any) {
        this.value = _.get(json, 'value');
        this.code_lang = _.get(json, 'code_lang');
        this.active = _.get(json, 'active');
        // this.member = new MemberModel(_.get(json, 'member'));
        this.label =  _.get(json, 'member_attribute.code');
    }

  
}

export default MemberValueModel