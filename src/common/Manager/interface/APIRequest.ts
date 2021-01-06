import { HTTPMethodEnum } from "common/Manager/Enumeration/HTTPMethodEnum";

export type APIRequestFetchOptions = {
  useInternal?: boolean
}

interface APIRequest {
  baseUrl?: string
  method: HTTPMethodEnum
  url: string
  makeQuery: () => any
  makeBody: () => void
  makeHeader: () => void
}

export default APIRequest
