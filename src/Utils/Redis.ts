import { createClient } from 'redis';

export const redisClient = createClient({
    url: 'redis://localhost:6379'
})

redisClient.on('error', (error) => console.error('Redis Client Error', error));

export const connectRedis = async () => {
    if(!redisClient.isOpen) await redisClient.connect();
}