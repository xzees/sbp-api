import 'reflect-metadata'
import 'babel-polyfill'

import DatabaseManager from 'manager/DatabaseManager';
import RequestLoggingMiddleware from 'middlewares/RequestLoggingMiddleware'
import addRequestId from 'express-request-id'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import httpContext from 'express-http-context'
import ConfigurationManager from 'manager/ConfigurationManager';

import http from 'http'
import expressSession from 'express-session'

import mockup from 'gateway/mockup'
import SwaggerGateway from 'gateway/doc/SwaggerGateway';
import payment from 'gateway/payment'
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";


const PORT = process.env.PORT || 5000
const app = express()

Sentry.init({ 
  dsn: process.env.SENTRY,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ 
      app, 
    }),
  ],
  tracesSampleRate: 1.0,
});

const server = http.createServer(app)
app.disable('x-powered-by');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())
app.use(addRequestId())

const session = expressSession({ secret: 'my-secret', resave: true, saveUninitialized: true })
app.use(session)
/** IMPORTANT: Must be declared and used as the last middleware. */
app.use(httpContext.middleware)
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

const bootstrap = () => {
    return Promise.all([
    //   CachingManager.default.createConnection()
    ]).then(() => {
      DatabaseManager.createConnection()
        .then(async isConnected => {
          await ConfigurationManager.init()
  
          app.get('/', (req, res) => {
            res.json({ message: 'API is running' })
          })
          app.use('*', RequestLoggingMiddleware)
          app.use('/mockup', mockup)
          app.use('/payment', payment)
          app.use('/swagger', SwaggerGateway)
  
          app.use(Sentry.Handlers.errorHandler());
          app.use(function onError(err, req, res, next) {
            res.statusCode = 500;
            res.end(res.sentry + "\n");
          });
  
          server.listen(PORT, () => {
            console.log(`API is running on port ${PORT}`)
          })
        })
        .catch(err => {
          console.log(err)
          process.exit(1)
        })
    })
}
const start = async() => {
  try { 
    await bootstrap();
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
start()
