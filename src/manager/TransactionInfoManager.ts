import TransactionInfo from 'database/entity/TransactionInfo'
import TransactionInfoDatastore from 'datastore/TransactionInfoDatastore'
import TransactionInfoModel from 'models/TransactionInfoModel'
import { Raw } from 'typeorm'
import TransactionManager from './TransactionManager'


class TransactionInfoManager {
    transactionInfoDatastore: TransactionInfoDatastore

    constructor() {
        this.transactionInfoDatastore = new TransactionInfoDatastore()
    }

    async updateTransaction(orderRef: string, status: string , channelCode: string) {
        const transaction = await this.transactionInfoDatastore.repo.findOne({
            relations: [
                'transaction', 
                'transaction.product_channel_fee',
                'transaction.product_channel_fee.channel',
                'transaction.product_channel_fee.product',
                'transaction.product_channel_fee.product.product',
            ],
            where: {
                order_code: orderRef,
            }
        })
        if(transaction) {
            for(const v of transaction.transaction) {
                if(v.product_channel_fee.channel.code == channelCode) {
                    const transaction_new_status = new TransactionManager()
                    const get_transaction_new_status = await transaction_new_status.transactionDatastore.repo.findOne({
                        where: {
                            id: v.id
                        }
                    })
                    if(get_transaction_new_status){
                        get_transaction_new_status.status = status
                        await transaction_new_status.save(get_transaction_new_status)
                    }
                    return v
                }
            }
        }

        return undefined

    }

    async findOrCreate(value: TransactionInfoModel): Promise<TransactionInfo> {
        const getLastTransaction = await this.transactionInfoDatastore.repo.findOne({
            relations: [
                'transaction', 
                'transaction.product_channel_fee',
                'transaction.product_channel_fee.channel',
            ],
            order: {
                id: 'DESC'
            },
            where: [
                { 
                    order_code: value.order_code,
                    secure_code: value.secure_code,
                    expired_at: Raw(alias =>`${alias} > NOW()`)
                }
            ]
        })
        if(getLastTransaction) {
            return getLastTransaction
        }
        return this.transactionInfoDatastore.save(value)
    }
}

export default TransactionInfoManager
