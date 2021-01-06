import APIRequest from 'common/Manager/interface/APIRequest';
import { HTTPMethodEnum } from 'common/Manager/Enumeration/HTTPMethodEnum';
class APICallbackRequest implements APIRequest {

  method: HTTPMethodEnum = HTTPMethodEnum.POST
  url: string
  param: any
  
  constructor(endpoint: string, param: any) {
    this.url = endpoint
    this.param = param
  }

  makeBody() {
    return {
      ...this.param
    }
  }

  makeQuery() {
    return {}
  }
  makeHeader() {
    return {}
  }
}

export default APICallbackRequest