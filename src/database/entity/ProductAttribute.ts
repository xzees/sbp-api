import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import ProductValue from './ProductValue'

@Entity({ name: "product_attribute" })
class ProductAttribute {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true,
    type: 'varchar',
    charset: "utf8", 
    collation: "utf8_general_ci",
    length: '200',
  })
  code: string

  @Column({
    type: 'varchar',
    charset: "utf8", 
    nullable: true,
    collation: "utf8_general_ci",
    length: '200'
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

  @OneToMany(type => ProductValue, v => v.product, {
    cascade: ['insert'],  
  })
  value: ProductValue[]

}

export default ProductAttribute