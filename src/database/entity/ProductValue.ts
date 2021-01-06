import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Product from './Product'
import ProductAttribute from './ProductAttribute'

@Entity({ name: "product_value" })
class ProductValue {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({
    type: 'text',
    charset: "utf8", 
    collation: "utf8_general_ci",
  })
  value: string

  @Column({
    type: 'varchar',
    charset: "utf8", 
    collation: "utf8_general_ci",
    length: 5
  })
  code_lang: string

  @ManyToOne(type => Product, v => v.id, {
    cascade: ['insert'], 
  })
  @JoinTable() 
  product: Product

  @ManyToOne(type => ProductAttribute, v => v.id ,{
    cascade: ['insert'],  
  })
  @JoinTable()
  product_attribute: ProductAttribute

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

}

export default ProductValue