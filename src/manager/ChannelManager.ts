import Channel from 'database/entity/Channel'
import ChannelDatastore from 'datastore/ChannelDatastore'
import ChannelModel from 'models/ChannelModel'

class ChannelManager {
  channelDatastore: ChannelDatastore = new ChannelDatastore()

  constructor() {
    this.channelDatastore = new ChannelDatastore()
  }

  async save(value: ChannelModel): Promise<Channel | undefined> {
    const get = await this.findByCode(value.code)
    if(!get){
      return this.channelDatastore.save(value)
    }
    return get
  }

  async findByCode(code: string): Promise<Channel | undefined> {
    return this.channelDatastore.findByCode(code)
  }
  
}

export default ChannelManager
