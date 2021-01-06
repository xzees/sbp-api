import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  OneToMany, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn 
} from 'typeorm'
import MemberValue from './MemberValue'

@Entity({ name: "member_attribute" })
class MemberAttribute {
  
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

  @OneToMany(type => MemberValue, v => v.member, {
    cascade: ['insert'],  
  })
  value: MemberValue[]

}

export default MemberAttribute