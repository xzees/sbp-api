import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  OneToMany, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn
} from 'typeorm'
import ProductValue from './ProductValue'

@Entity({ name: "product" })
class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true,
    type: 'varchar',
    charset: "utf8", 
    collation: "utf8_general_ci",
    generated: 'uuid'
  })
  public_key: string

  @Column({
    unique: true,
    type: 'varchar',
    charset: "utf8", 
    collation: "utf8_general_ci",
    generated: 'uuid'
  })
  secure_key: string

  @Column({
    type: 'varchar',
    charset: "utf8", 
    collation: "utf8_general_ci",
  })
  code: string
  
  @Column({
    type: 'varchar',
    charset: "utf8", 
    collation: "utf8_general_ci",
  })
  callback_url: string

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

  @OneToMany(type => ProductValue, v => v.product, {
    cascade: ['insert'], 
  })
  value: ProductValue[] 

}

export default Product