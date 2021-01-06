import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  JoinTable, 
  ManyToOne, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn
} from 'typeorm'
import ProductChannelFee from './ProductChannelFee'
import TransactionInfo from './TransactionInfo'

@Entity({ name: "transaction" })
class Transaction {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true,
    type: 'varchar',
    charset: "utf8", 
    collation: "utf8_general_ci",
    generated: 'uuid'
  })
  uuid: string

  @Column({
    type: 'decimal',
    precision: 11, 
    scale: 2,
  })
  amount_fee: number

  @Column({
    type: 'decimal',
    precision: 11, 
    scale: 2,
  })
  fee: number

  @Column({
    type: 'decimal',
    precision: 11, 
    scale: 2,
  })
  amount_not_fee: number

  @ManyToOne(type => TransactionInfo, v => v.id, {
    cascade: ['insert'], 
  })
  @JoinTable() 
  info: TransactionInfo

  @ManyToOne(type => ProductChannelFee, v => v.id, {
    cascade: ['insert'], 
  })
  @JoinTable() 
  product_channel_fee: ProductChannelFee

  @Column({
    type: 'enum',
    enum: ['y', 'n'],
    default: 'n',
  })
  status: string

  @Column({
    type: 'enum',
    enum: ['y', 'n'],
    default: 'y',
  })
  active: string

  @CreateDateColumn({
    type: "timestamp"
  })
  created_at: Date

  @UpdateDateColumn({
    type: "timestamp"
  })
  updated_at: Date

}

export default Transaction