import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const hello = new Hono();

hello.get(
  "/hello",
  zValidator(
    "query",
    z.object({
      name: z.string(),
    }),
  ),
  (c) => {
    const { name } = c.req.valid("query");
    return c.json({
      message: `Hello! ${name}`,
    });
  },
);

hello.get("/token", async (c) => {
  const userCode = c.req.query("userCode") || "KTA-max";
  const password = c.req.query("password") || "Aa1234567";

  const requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(
    `https://dmsuatapi.volvocartw.com/openapi/bff-sales-line/auth/token?lineId=1568126&userCode=${userCode}&password=${password}&clientId=7761bedc-12e4-4768-b173-bb0c8e99e12f`,
    requestOptions as RequestInit,
  );
  const data = await res.json();
  return c.json(data);
});

export type HelloController = typeof hello;
export default hello;
