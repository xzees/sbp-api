import { FeeTypeEnum } from 'enum/FeeTypeEnum'
import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  OneToMany, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn
} from 'typeorm'
import ProductChannelFee from './ProductChannelFee'

@Entity({ name: "fee" })
class Fee {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'int'
  })
  value: number

  @Column({
    type: 'enum',
    charset: "utf8", 
    enum: FeeTypeEnum
  })
  type: string

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

  @OneToMany(type => ProductChannelFee, c => c.channel, {
    cascade: ['insert'], 
  })
  product_channel: ProductChannelFee[]

}

export default Fee