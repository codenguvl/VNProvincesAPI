import { createClient } from 'redis'
import * as dotenv from 'dotenv'
dotenv.config()
const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379', 10)
  }
})

client.on('connect', () => {
  console.log('Connected to Redis')
})

client.on('error', (err) => {
  console.error('Redis connection error:', err)
})

client.connect().catch(console.error)

export default client
