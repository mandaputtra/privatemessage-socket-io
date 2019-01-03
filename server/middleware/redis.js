const Redis = require('ioredis');

const redisConfig = {
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || '127.0.0.1',
};

const redis = new Redis(redisConfig);
const pub = new Redis(redisConfig);

// exports.sendMessage = message => pub.publish('chat', message);
// exports.saveUser = userId => redis.set('foo', 'bar');
exports.redis = redis;
