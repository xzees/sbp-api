import APIResponse from 'interface/APIResponse';
import httpContext from 'express-http-context'

class APIResponseModel implements APIResponse {
  status: number = 200
  message?: string

  toAPIResponse() {
    return {
      status: this.status,
      requestId: httpContext.get('requestId'),
      message: this.message,
    }
  }
}

export default APIResponseModel