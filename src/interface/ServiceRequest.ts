import { HTTPMethod } from "enum/HTTPMethod";

interface ServiceRequest {
  method: HTTPMethod
  url: string
  makeQuery: () => void
  makeBody: () => void
  makeHeader?: () => {}
}

export default ServiceRequest