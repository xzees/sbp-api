import { 
  Column, 
  Entity, 
  JoinTable, 
  ManyToOne, 
  PrimaryGeneratedColumn, 
} from 'typeorm'
import Fee from './Fee'
import ProductHasMember from './ProductHasMember'
import Channel from './Channel'

@Entity({ name: "product_channel_fee" })
class ProductChannelFee {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => ProductHasMember, v => v.id, {
    cascade: ['insert', 'update'], 
  })
  @JoinTable() 
  product: ProductHasMember

  @ManyToOne(type => Fee, v => v.id ,{
    cascade: ['insert', 'update'],  
  })
  @JoinTable()
  fee: Fee

  @ManyToOne(type => Channel, v => v.id ,{
    cascade: ['insert', 'update'],  
  })
  @JoinTable()
  channel: Channel

  @Column({
    type: 'enum',
    enum: ['y', 'n'],
    default: 'y',
  })
  active: string


}

export default ProductChannelFee