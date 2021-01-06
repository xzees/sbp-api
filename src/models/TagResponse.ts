import APIResponse from 'interface/APIResponse';
import { covertTagToObject } from 'util/EncodeUtil'

class TagResponse implements APIResponse {

  data: any

  constructor(data: any) {
    this.data = data
  }

  toAPIResponse() {
    return this.data.data
  }

  static create(data: any): TagResponse {
    let apiJSONResponse = new TagResponse('')
    try{
      data.data = covertTagToObject(data.data)
    }catch(e){
      console.log(e)
    }
    apiJSONResponse.data = data
    return apiJSONResponse
  }
}

export default TagResponse