import { RedisClient } from 'redis';
import RedisConnection from 'manager/RedisConnection';
import CacheModel from 'models/CacheModel';
import sha1 from 'sha1'
import moment from 'moment'

class CachingManager {

  static default: CachingManager = new CachingManager()
  isConnected: boolean = false
  private client: RedisClient
  private changesDetector: any
  
  private constructor() { }

  createConnection(): Promise<boolean> {
    // this.changesDetector = setInterval(
    //   this.flushall.bind(this),
    //   50000
    // )
    return new Promise((resolve, reject) => {
      const redisConnection = new RedisConnection()
      this.client = redisConnection.createConnection()
      this.client.on('connect', () => {
        this.isConnected = this.client.connected
        if (this.isConnected) {
          resolve(true)
        } else {
          reject(false)
        }
      })
    })
  }

  get(key: string): Promise<CacheModel | undefined> {
    return new Promise((resolve, reject) => {
      try{
        this.client.get(key, (err, reply) => {
          if (err) return reject("Redis Error.")
          if (reply) {
            const json = JSON.parse(reply)
            resolve(CacheModel.convertToModel(json))
          } else {
            resolve(undefined)
          }
        })
      }catch(e){
        console.log(e)
      }
    })
  }

  async set(key: string, cacheModel: CacheModel): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.client.set(key, cacheModel.toString(), (err, reply) => {
        if (err) return reject(err)
        resolve(true)
      })
    })
  }
  
  generateRequestHash(uniqueText: string) {
    const now = moment()
    return sha1(uniqueText + now.valueOf())
  }

  generateCacheHash(uniqueText: string) {
    return sha1(uniqueText)
  }

  flushall() {
    return new Promise((resolve) => {
      this.client.flushall()
    })
  }
}

export default CachingManager