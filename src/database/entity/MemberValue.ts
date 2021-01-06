import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Member from './Member'
import MemberAttribute from './MemberAttribute'

@Entity({ name: "member_value" })
class MemberValue {
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

  @ManyToOne(type => Member, v => v.id, {
    cascade: ['insert'], 
  })
  @JoinTable() 
  member: Member

  @ManyToOne(type => MemberAttribute, v => v.id ,{
    cascade: ['insert'],  
  })
  @JoinTable()
  member_attribute: MemberAttribute

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

export default MemberValue