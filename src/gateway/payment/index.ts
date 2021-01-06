import express from 'express'
import PaymentList from './list'
import PaymentForm from './form'
import PaymentTransaction from './transaction'
import PaymentRetrieve from './retrieve'
import PaymentUpdate from './update'

const Payment = express()

Payment.use('/list', PaymentList)
Payment.use('/form', PaymentForm)
Payment.use('/transaction', PaymentTransaction)
Payment.use('/retrieve', PaymentRetrieve)
Payment.use('/update', PaymentUpdate)

export default Payment