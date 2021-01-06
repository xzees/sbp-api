import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  OneToMany, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn
} from 'typeorm'
import MemberValue from './MemberValue'

@Entity({ name: "member" })
class Member {
  @PrimaryGeneratedColumn()
  id: number

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
  logo: string

  @Column({
    type: 'enum',
    enum: ['y', 'n'],
    default: 'y',
  })
  active: string

  @Column({
    unique: true,
    type: 'varchar',
    charset: "utf8", 
    collation: "utf8_general_ci",
    generated: 'uuid'
  })
  uuid: string


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

export default Member