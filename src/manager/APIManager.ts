import axios, { AxiosRequestConfig } from 'axios'
import qs from 'query-string'
import ServiceRequest from 'interface/ServiceRequest';
import Response from 'models/Response';

axios.interceptors.request.use(request => {
    console.log(`>>>> API Request ${JSON.stringify(request, null, 2)}`)
    console.log(`URL = ${request.url}?${qs.stringify(request.params)}`)
    console.log('---------------------------------------------')
  // LogManager.default.sendLog(request, 'ApiManager-Request')
  return request
})

axios.interceptors.response.use(response => {
    console.log(`>>>> API Response ${JSON.stringify(response.data || {})}`)
    console.log('---------------------------------------------')
  // LogManager.default.sendLog(response, 'ApiManager-Response')
  return response
})

class APIManager {

  static default: APIManager = new APIManager()

  private init() {
    // axios.defaults.timeout =
    //   parseInt(
    //     ConfigurationManager.default.getConfig(
    //       'translator.request.timeout',
    //       config.get('api.timeout')
    //     )
    //   ) * 1000
  }

  fetch(url, options): Promise<Response> {
    this.init()
    options = { ...options, ...{ url } }
    return new Promise((resolve, reject) => {
      axios(options)
        .then(response => {
          const responseModel = new Response(response.data)
          resolve(responseModel)
        })
        .catch(err => {
          // Raven.captureException(err)
          // const errData = _.get(err, 'response.data')
          console.log('API Error', String(err)+": "+url)
          const responseModel = new Response(err)
          responseModel.success = false
          resolve(responseModel)
        })
    })
  }

  fetchService(apiRequest: ServiceRequest): Promise<Response> {
    const options = this.createAxiosOptions(apiRequest)
    return new Promise((resolve, reject) => {
      axios(options)
        .then(response => {
          const responseModel = new Response(response.data)
          resolve(responseModel)
        })
        .catch(err => {
          console.log("API ERROR", String(err)+": "+options.url)
          // Raven.captureException(err)
          if (err.response) {
            const responseModel = new Response(err.response.data)
            responseModel.success = false
            reject(responseModel)
          } else {
            const responseModel = new Response(err)
            responseModel.success = false
            reject(responseModel)
          }
        })
    })
  }

  /**
   * If there's a token or Authorization criteria, you can put it in here.
   */
  private createAxiosOptions(apiRequest: ServiceRequest): AxiosRequestConfig {
    return {
      url: apiRequest.url,
      method: apiRequest.method,
      headers: !!apiRequest.makeHeader ? apiRequest.makeHeader() : {},
      data: apiRequest.makeBody(),
      params: apiRequest.makeQuery()
    }
  }
}

export default APIManager
