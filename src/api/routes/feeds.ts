import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

const feed = new Hono();

const input = z.object({
  firstname: z.string(),
  lastname: z.string(),
});

const route = feed.post('/getFeeds', zValidator('json', input), (c) => {
  return c.json({ message: `GetFeeds` });
});

export type FeedController = typeof route;
export default feed;
