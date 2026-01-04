import { createClient } from 'redis'

const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
    },
    // password: process.env.REDIS_PASSWORD // Uncomment if you set a password
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
    await redisClient.connect();
    console.log(`Connected to Redis at ${process.env.REDIS_HOST}`);
})();


export default redisClient