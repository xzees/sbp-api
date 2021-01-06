import config from 'config'
import redis from 'redis'

class RedisConnection {
  createConnection() {
    const host = config.get('redis.host') as string
    const port = parseInt(config.get('redis.port')) || 6379
    const password = config.get('redis.password') as string
    return redis.createClient(port, host, { password })
  }
}

export default RedisConnection