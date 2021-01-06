import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  OneToMany, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn
} from 'typeorm'
import Transaction from './Transaction'

@Entity({ name: "transaction_info" })
class TransactionInfo {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    charset: "utf8", 
    collation: "utf8_general_ci",
  })
  order_code: string
  
  @Column({
    type: 'varchar',
    charset: "utf8", 
    collation: "utf8_general_ci",
  })
  page_lang: string

  @Column({
    type: 'boolean',
    default: false
  })
  multi_amount: boolean
  
  @Column({
    type: 'varchar',
    charset: "utf8", 
    collation: "utf8_general_ci",
  })
  secure_code: string

  @Column({
    type: 'varchar',
    charset: "utf8", 
    collation: "utf8_general_ci",
  })
  success_url: string

  @Column({
    type: 'varchar',
    charset: "utf8", 
    collation: "utf8_general_ci",
  })
  fail_url: string

  @Column({
    type: "timestamp",
  })
  expired_at: Date

  @CreateDateColumn({
    type: "timestamp"
  })
  created_at: Date 

  @UpdateDateColumn({
    type: "timestamp",
  })
  updated_at: Date

  @OneToMany(type => Transaction, v => v.info, {
    cascade: ['insert'], 
  })
  transaction: Transaction[] 

}

export default TransactionInfo