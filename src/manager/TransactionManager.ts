import Transaction from 'database/entity/Transaction'
import TransactionDatastore from 'datastore/TransactionDatastore'


class TransactionManager {
    transactionDatastore: TransactionDatastore
    constructor() {
        this.transactionDatastore = new TransactionDatastore()
    }

    save(value: Transaction) {
        return this.transactionDatastore.save(value)
    }

    findByUUid(uuid: string) {
        return this.transactionDatastore.findByUUid(uuid)
    }

    
  
}

export default TransactionManager
