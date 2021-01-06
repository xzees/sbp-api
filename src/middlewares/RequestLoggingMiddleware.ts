import express from 'express'
import httpContext from 'express-http-context'

const RequestLoggingMiddleware = express()

RequestLoggingMiddleware.use('*', (req, res, next) => {
  try {
    const requestId = req['id']
    httpContext.set('requestId', requestId)

  } catch (error) {
    console.error("RequestGatewayLog Error", error)
  }
  next()
})

export default RequestLoggingMiddleware