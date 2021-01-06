import _ from "lodash";
import Axios, { AxiosRequestConfig } from "axios";
import { StatusCode } from "common/Manager/Enumeration/StatusCodeEnum";
import APIResponse from "common/Manager/Models/API/APIResponse";
import APIRequest from "common/Manager/interface/APIRequest";
import APIConfig from "common/Manager/API";

// Axios.interceptors.request.use((request: any) => {
//   const production = process.env.NODE_ENV === "production";
//   if (production) return request;
//   // console.log(`>>>> API Request ${JSON.stringify(request, null, 2)}`)
//   // console.log(`URL = ${request.url}?${qs.stringify(request.params)}`)
//   // console.log('---------------------------------------------')
//   return request;
// });

// Axios.interceptors.request.use(request => {
//   // if(Boolean(config.get('api.logging'))){
//     console.log(`>>>> API Request ${JSON.stringify(request, null, 2)}`)
//     console.log(`URL = ${request.url}?${qs.stringify(request.params)}`)
//     console.log('---------------------------------------------')
//   // }
//   // LogManager.default.sendLog(request, 'ApiManager-Request')
//   return request
// })

// Axios.interceptors.response.use(response => {
//   // if(Boolean(config.get('api.logging'))){
//     console.log(`>>>> API Response ${JSON.stringify(response.data || {})}`)
//     console.log('---------------------------------------------')
//   // }
//   // LogManager.default.sendLog(response, 'ApiManager-Response')
//   return response
// })

const CancelToken = Axios.CancelToken;

class APIManager {
  static default: APIManager = new APIManager();

  cancelTokens: (() => void)[] = [];

  private constructor() {}

  fetch(apiRequest: APIRequest): Promise<APIResponse> {
    const options = this.createAxiosOptions(apiRequest);
    return new Promise((resolve, reject) => {
      Axios(options)
        .then((response) => {
          const responseModel = new APIResponse(
            response.data,
            response.status == StatusCode.SUCCESS
          );
          resolve(responseModel);
        })
        .catch((err) => {
          if (Axios.isCancel(err)) {
            console.log("REQUEST Cancelled", options);
          }
          try {
            console.log("API ERROR", err);
          } catch (error) {
            console.log(err);
          }
          if (err.response) {
            reject(new APIResponse(err.response.data, false));
          } else {
            reject(new APIResponse(err, false));
          }
        });
    });
  }

  cancelAllRequests() {
    this.cancelTokens.forEach((x) => x());
    this.cancelTokens = [];
  }

  /**
   * If there's a token or Authorization criteria, you can put it in here.
   */
  private createAxiosOptions(apiRequest: APIRequest): AxiosRequestConfig {
    const body = apiRequest.makeBody();
    const header = apiRequest.makeHeader();
    return {
      baseURL: apiRequest.baseUrl
        ? apiRequest.baseUrl
        : APIConfig.default.getBaseUrl(),
      url: apiRequest.url,
      headers: !_.isEmpty(header) ? header : APIConfig.default.getRequestHeaders(),
      cancelToken: new CancelToken((c) => this.cancelTokens.push(c)),
      method: apiRequest.method,
      data: !_.isEmpty(body) ? body : undefined,
      params: {
        ...(apiRequest.makeQuery() || {}),
        timestemp: new Date().getTime(),
      },
    };
  }
}

export default APIManager;
