import { Like, Repository, SelectQueryBuilder, UpdateResult } from 'typeorm'
import Member from '../database/entity/Member'
import MemberAttribute from '../database/entity/MemberAttribute'
import MemberValue from '../database/entity/MemberValue'
import databaseManager from 'manager/DatabaseManager'
import _ from 'lodash'
import MemberModel from 'models/MemberModel'

class MemberDatastore {
  repoMember: Repository<Member>
  repoAttribute: Repository<MemberAttribute>
  repoValue: Repository<MemberValue>

  constructor() {
    this.repoMember = databaseManager.connection.getRepository(Member)
    this.repoAttribute = databaseManager.connection.getRepository(MemberAttribute)
    this.repoValue = databaseManager.connection.getRepository(MemberValue)
  }

  member(): SelectQueryBuilder<Member> {
    return this.repoMember.createQueryBuilder('member')
  }
  
  attr(): SelectQueryBuilder<MemberAttribute> {
    return this.repoAttribute.createQueryBuilder('member_attribute')
  }

  value(): SelectQueryBuilder<MemberValue> {
    return this.repoValue.createQueryBuilder('member_value')
  }

  async save(value: MemberModel): Promise<Member | undefined> {
    const new_value_member: MemberValue[] = await Promise.all(
        _.map(value.attr, async (vLang: string, kLang: string) => {
          return await Promise.all(_.map(vLang, async (v, k)  => {
            return {
              member_attribute: {
                ...await this.repoAttribute.findOne({
                  code: k,
                  active: 'y'
                }),
                code: k,
              },
              code_lang: kLang,
              value: v
            }
          }))
      })
    )
    const mapValue = new_value_member.flat(1);
    const member = await this.repoMember.findOne({
      code: value.code,
      active: 'y'
    })

    if(!member) {
      return this.repoMember.save({
        value: mapValue,
        code: value.code,
        logo: value.logo
      })
    }

    const mapValueProduct = mapValue.map(v=>{
      return {
        ...v,
        member: member
      }
    })
    
    await this.repoValue.save(mapValueProduct)
    return this.repoMember.findOne({
      code: value.code,
      active: 'y'
    })
  }
  
  async delete(code: string): Promise<UpdateResult | undefined> {
    const findCode = (await this.repoMember.findOne({
      where: {
        code: code
      }
    }))
    if(findCode == undefined) return undefined
    return this.repoMember.update(findCode.id ,{
      code: code,
      active: 'n'
    })
  }

  async findByCode(code: string): Promise<Member | undefined> {
    return this.repoMember.findOne({
        relations: ['value', 'value.member_attribute'],
        where: [{
          code: code,
          active: 'y'
        }]
    });
  }

  async findByAttr(field: string, value: string): Promise<MemberValue[]> {
    return this.repoValue.find({
        relations: ['member', 'member_attribute'],
        where: [{
            value: Like(`%${value}%`),
            member_attribute: (await this.repoAttribute.findOne({code: field}))!.id
        }]
    });
  }

  async getValueById(id: number): Promise<MemberValue[]> {
    return this.repoValue.find({
        relations: ['member', 'member_attribute'],
        where: [{
            member: id,
        }]
    });
  }
  
  
}

export default MemberDatastore
