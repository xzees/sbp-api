import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  JoinTable, 
  ManyToOne, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn
} from 'typeorm'
import Member from './Member'
import Product from './Product'

@Entity({ name: "product_has_member" })
class ProductHasMember {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => Member, v => v.id, {
    cascade: ['insert'], 
  })
  @JoinTable() 
  member: Member

  @ManyToOne(type => Product, v => v.id, {
    cascade: ['insert'], 
  })
  @JoinTable()
  product: Product

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

export default ProductHasMember