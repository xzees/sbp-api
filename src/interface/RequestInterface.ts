import { HTTPMethod } from 'enum/HTTPMethod';

interface RequestInterface {
  method: HTTPMethod
  makeQuery(): any
  makeBody(): any
}

export default RequestInterface