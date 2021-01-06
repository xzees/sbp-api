import Member from 'database/entity/Member'
import MemberDatastore from 'datastore/MemberDatastore'
import MemberModel from 'models/MemberModel'

class MemberManager {
  memberDatastore: MemberDatastore = new MemberDatastore()

  constructor() {
    this.memberDatastore = new MemberDatastore()
  }

  async save(value: MemberModel): Promise<Member | undefined> {
    return this.memberDatastore.save(value)
  }

  async findByCode(code: string) {
    return this.memberDatastore.findByCode(code)
  }
  
}

export default MemberManager
