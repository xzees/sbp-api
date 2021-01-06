import express from 'express'
import success from './success'
import fail from './fail'

const PaymentUpdate = express()


PaymentUpdate.use('/success', success)
PaymentUpdate.use('/fail', fail)

export default PaymentUpdate