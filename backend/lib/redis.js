import Redis from "ioredis"
import dotenv from "dotenv"

dotenv.config();  //allows us to use .env

const redis = new Redis(process.env.UPSTASH_REDIS_URL);
//key is foo, value is bar
await redis.set('foo', 'bar');