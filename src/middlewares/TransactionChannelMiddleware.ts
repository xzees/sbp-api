import httpContext from 'express-http-context'
import { TransactionChannelEnum } from 'enum/TransactionChannelEnum'

export default (req, res, next) => {
  const channel = (req.headers["transaction_channel"] as string || '').toLowerCase()
  let transactionChannel: TransactionChannelEnum = TransactionChannelEnum.OTHER
  switch (channel) {
    case 'mobile': {
      transactionChannel = TransactionChannelEnum.MOBILE_APPLICATION
      break
    }
    case 'desktop_web': {
      transactionChannel = TransactionChannelEnum.DESKTOP_WEB
      break
    }
    case 'mobile_web': {
      transactionChannel = TransactionChannelEnum.MOBILE_WEB
      break
    }
    case 'ios': {
      transactionChannel = TransactionChannelEnum.IOS
      break
    }
    case 'android': {
      transactionChannel = TransactionChannelEnum.ANDROID
      break
    }
  }
  httpContext.set('transactionChannel', transactionChannel)
  next()
}