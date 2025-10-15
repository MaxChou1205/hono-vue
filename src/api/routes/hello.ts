import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

const hello = new Hono().get(
  '/hello',
  zValidator(
    'query',
    z.object({
      name: z.string(),
    }),
  ),
  (c) => {
    const { name } = c.req.valid('query');
    return c.json({
      message: `Hello! ${name}`,
    });
  },
);

export type HelloController = typeof hello;
export default hello;
