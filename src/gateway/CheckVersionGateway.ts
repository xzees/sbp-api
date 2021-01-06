import express from 'express'

const CheckVersionGateway = express()

CheckVersionGateway.post('/', (req, res) => {
    return res.status(200).json({
      status: 200
    })
})

export default CheckVersionGateway