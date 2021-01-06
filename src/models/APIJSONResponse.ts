import APIResponse from 'interface/APIResponse';
import httpContext from 'express-http-context'

class APIJSONResponse implements APIResponse {

  data: any

  constructor(data: any) {
    this.data = data
  }

  toAPIResponse() {
    return {
      status: 200,
      ...this.data,
      requestId: httpContext.get('requestId')
    }
  }

  static create(data: any): APIJSONResponse {
    let apiJSONResponse = new APIJSONResponse('')
    apiJSONResponse.data = data
    return apiJSONResponse
  }
}

export default APIJSONResponse