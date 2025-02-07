import { Context, Next } from 'hono';

const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 60 * 1000; // 1分

export const cacheMiddleware = async (c: Context, next: Next) => {
  const cacheKey = `${c.req.url}-${c.get('userId')}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    return c.json(cachedData.data);
  }

  await next();

  if (c.res.status === 200) {
    const data = await c.res.json();
    cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });
    return c.json(data);
  }
}; 