import { createClient } from "redis";


let redisClient =null;

export const connectRedis = async () => {
    try {
        redisClient = createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379'
        })

        redisClient.on('error', (err) => console.error('Redis Client Error',err));
        redisClient.on('connect', () => console.log('Redis Connected'));

        await redisClient.connect();
        return redisClient;
    } catch (error) {
        console.error('Redis connection error:', error);
        return null;
        
    }

}

export const getRedisClient =() => redisClient;

export const disconnectedRedis = async () => {
    if (redisClient) {
        await redisClient.quit();
    }
}