import redis from 'redis'
import dotenv from 'dotenv'
dotenv.config()

const redisClient = ()=>{
    return redis.createClient({
            url:process.env.REDIS_URL
    })};
const client =redisClient();
client.on('error' ,(err : unknown)=>{
    console.log(err)
});

client.on('connect' ,()=>{
    console.log('connected to redis')
});

client.on('end' ,()=>{
    console.log('redis connection ends')
});

client.on('SIGQUIT' ,()=>{
    client.quit()
});

export default client
