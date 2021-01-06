import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

const SwaggerGateway = express()

var options = { 
  swaggerDefinition: {
    info: {
      title: 'Sabuypay API', 
      version: '1.0.0', 
      description: 'TCC Sabuypay API '
    },
    // host: "dev-services.travizgo.com",
    // basePath: "/"
  },
  apis: ['src/gateway/**/*.ts','src/gateway/**/**/*.ts','src/gateway/**/**/**/*.ts'], // Path to the API docs
};
var swaggerSpec = swaggerJSDoc(options); 

SwaggerGateway.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
SwaggerGateway.use(swaggerUi.serve)
SwaggerGateway.get('/', swaggerUi.setup(swaggerSpec)); 


export default SwaggerGateway