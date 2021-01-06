import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import APIResponse from 'interface/APIResponse'

@Entity({ name: "configuration" })
class Configuration implements APIResponse {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    unique: true
  })
  key: string

  @Column({
    type: 'varchar'
  })
  value: string

  @Column({
    type: 'varchar',
    charset: "utf8", 
    collation: "utf8_general_ci",
  })
  note: string

  toAPIResponse() {
    return {
      id: this.id,
      key: this.key,
      value: this.value,
      note: this.note
    }
  }
}

export default Configuration