import { Repository } from 'typeorm'
import Channel from '../database/entity/Channel'
import databaseManager from 'manager/DatabaseManager'
import ChannelModel from 'models/ChannelModel'

class ChannelDatastore {
  repoChannel: Repository<Channel>

  constructor() {
    this.repoChannel = databaseManager.connection.getRepository(Channel)
  }

  channel() {
    return this.repoChannel.createQueryBuilder('channel')
  }

  findByCode(code: string) {
    return this.repoChannel.findOne({
      where: {
        code: code
      }
    })
  }

  save(entity: ChannelModel): Promise<Channel> {
    return this.repoChannel.save(entity.toResponse())
  }
 
}

export default ChannelDatastore
