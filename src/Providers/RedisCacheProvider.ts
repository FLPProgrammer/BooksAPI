import { redisClient } from '../Utils/Redis';
import { ICacheProvider } from '../Interfaces/ICacheProvider';


export class RedisCacheProvider implements ICacheProvider {
    
    async get(key: string) {
        return redisClient.get(key);
    }

    async set(
        key: string,
        value: string,
        ttl=3600
    ) {
        await redisClient.set(
            key,
            value,
            { EX: ttl }
        )
    }

    async del(key: string) {
        await redisClient.del(key)
    }
}