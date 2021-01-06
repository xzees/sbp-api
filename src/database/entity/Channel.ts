import { ChannelPaymentEnum } from 'enum/ChannelPaymentEnum'
import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  OneToMany, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn
} from 'typeorm'
import ProductChannelFee from './ProductChannelFee'

@Entity({ name: "channel" })
class Channel {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({
    type: 'varchar',
    charset: "utf8", 
    collation: "utf8_general_ci",
    length: 500
  })
  code: string

  @Column({
    type: 'enum',
    charset: "utf8", 
    enum: ChannelPaymentEnum
  })
  group_code: string

  @Column({
    type: 'varchar',
    charset: "utf8", 
    collation: "utf8_general_ci",
    length: 500
  })
  frontend_url: string

  @Column({
    type: 'varchar',
    charset: "utf8", 
    collation: "utf8_general_ci",
    length: 500
  })
  payment_url: string

  @Column({
    type: 'varchar',
    charset: "utf8", 
    collation: "utf8_general_ci",
    length: 500,
    nullable: true
  })
  token_url: string

  @Column({
    type: 'varchar',
    charset: "utf8", 
    collation: "utf8_general_ci",
    length: 500,
    nullable: true
  })
  api_key: string

  @Column({
    type: 'varchar',
    charset: "utf8", 
    collation: "utf8_general_ci",
    length: 500
  })
  icon: string

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

  @OneToMany(type => ProductChannelFee, v => v.channel, {
    cascade: ['insert'], 
  })
  product_fee: ProductChannelFee[]

}

export default Channel