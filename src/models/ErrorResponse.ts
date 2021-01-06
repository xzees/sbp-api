import APIResponse from 'interface/APIResponse';

class ErrorResponse implements APIResponse {
  messageCode?: string
  message: string
  note: any
  status: number

  constructor(message: string, status: number = 400) {
    this.status = status;
    this.message = message
  }

  toAPIResponse() {
    return {
      status: 400,
      message: this.message,
      messageCode: this.messageCode,
      note: this.note
    }
  }

  static create(err: any): ErrorResponse {
    let errorResponse = new ErrorResponse('')
    if (typeof err == 'string') {
      errorResponse.message = err
    } else if (err instanceof ErrorResponse) {
      errorResponse = err
    } else {
      errorResponse.message = "An error occurs."
      errorResponse.note = err
    }
    return errorResponse
  }
}

export default ErrorResponse