import config from 'config'
import { createConnection } from 'typeorm'

import Channel from './entity/Channel'
import Configuration from './entity/Configuration'
import Fee from './entity/Fee'
import Member from './entity/Member'
import MemberAttribute from './entity/MemberAttribute'
import MemberValue from './entity/MemberValue'
import Product from './entity/Product'
import ProductAttribute from './entity/ProductAttribute'
import ProductChannelFee from './entity/ProductChannelFee'
import ProductHasMember from './entity/ProductHasMember'
import ProductValue from './entity/ProductValue'
import Transaction from './entity/Transaction'
import TransactionInfo from './entity/TransactionInfo'

export default {
  createConnection : () => {
    return createConnection({
      type: 'mysql',
      host: String(config.get('database.host')),
      port: parseInt(config.get('database.port')),
      username: String(config.get('database.username')),
      password: String(config.get('database.password')),
      database: String(config.get('database.database')),
      logging: Boolean(config.get('database.logging')),
      synchronize: true,
      entities: [
        Channel,
        Configuration,
        Fee,
        Member,
        MemberAttribute,
        MemberValue,
        Product,
        ProductAttribute,
        ProductChannelFee,
        ProductHasMember,
        ProductValue,
        Transaction,
        TransactionInfo,
      ]
    })
  }
}