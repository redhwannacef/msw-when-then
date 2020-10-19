const { rest } = require("msw");
const { setupServer } = require("msw/node");
const { whenThen, get, ok, badRequest } = require("../src");
const fetch = require("node-fetch");

const server = setupServer();

const { when } = whenThen(server, rest);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const fetchExample = () => fetch("https://some.url").then((res) => res);

test("mocks chained responses with thenReturn", async () => {
  when(get("https://some.url"))
    .thenReturn(ok({ response: "response1" }))
    .thenReturn(badRequest({ response: "response2" }));

  const response1 = await fetchExample();
  const json1 = await response1.json();

  expect(response1.status).toBe(200);
  expect(json1).toStrictEqual({ response: "response1" });

  const response2 = await fetchExample();
  const json2 = await response2.json();

  expect(response2.status).toBe(400);
  expect(json2).toStrictEqual({ response: "response2" });
});

test("mocks chained responses with then", async () => {
  when(get("https://some.url"))
    .then((req, res, ctx) =>
      res(ctx.status(200), ctx.json({ response: "response1" }))
    )
    .then((req, res, ctx) =>
      res(ctx.status(400), ctx.json({ response: "response2" }))
    );

  const response1 = await fetchExample();
  const json1 = await response1.json();

  expect(response1.status).toBe(200);
  expect(json1).toStrictEqual({ response: "response1" });

  const response2 = await fetchExample();
  const json2 = await response2.json();

  expect(response2.status).toBe(400);
  expect(json2).toStrictEqual({ response: "response2" });
});

test("mocks chained responses with mix of thenReturn and then", async () => {
  when(get("https://some.url"))
    .thenReturn(ok({ response: "response1" }))
    .then((req, res, ctx) =>
      res(ctx.status(400), ctx.json({ response: "response2" }))
    );

  const response1 = await fetchExample();
  const json1 = await response1.json();

  expect(response1.status).toBe(200);
  expect(json1).toStrictEqual({ response: "response1" });

  const response2 = await fetchExample();
  const json2 = await response2.json();

  expect(response2.status).toBe(400);
  expect(json2).toStrictEqual({ response: "response2" });
});

test("last response with chained mocks is used with multiple fetches with then", async () => {
  when(get("https://some.url"))
    .thenReturn(ok({ response: "response1" }))
    .then((req, res, ctx) =>
      res(ctx.status(400), ctx.json({ response: "response2" }))
    );

  const response1 = await fetchExample();
  const json1 = await response1.json();

  expect(response1.status).toBe(200);
  expect(json1).toStrictEqual({ response: "response1" });

  const response2 = await fetchExample();
  const json2 = await response2.json();

  expect(response2.status).toBe(400);
  expect(json2).toStrictEqual({ response: "response2" });

  const response3 = await fetchExample();
  const json3 = await response3.json();

  expect(response3.status).toBe(400);
  expect(json3).toStrictEqual({ response: "response2" });
});

test("last response with chained mocks is used with multiple fetches with thenReturn", async () => {
  when(get("https://some.url"))
    .then((req, res, ctx) =>
      res(ctx.status(200), ctx.json({ response: "response1" }))
    )
    .thenReturn(badRequest({ response: "response2" }));

  const response1 = await fetchExample();
  const json1 = await response1.json();

  expect(response1.status).toBe(200);
  expect(json1).toStrictEqual({ response: "response1" });

  const response2 = await fetchExample();
  const json2 = await response2.json();

  expect(response2.status).toBe(400);
  expect(json2).toStrictEqual({ response: "response2" });

  const response3 = await fetchExample();
  const json3 = await response3.json();

  expect(response3.status).toBe(400);
  expect(json3).toStrictEqual({ response: "response2" });
});
