const { rest } = require("msw");
const { setupServer } = require("msw/node");
const { whenThen, get, ok } = require("../src");
const fetch = require("node-fetch");

const server = setupServer();

const { when } = whenThen(server, rest);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const fetchExample = () => fetch("https://example.com").then((res) => res);

test("mocks response with thenReturn", async () => {
  when(get("https://example.com")).thenReturn(ok({ response: "success" }));

  const response = await fetchExample();
  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json).toStrictEqual({ response: "success" });
});

test("mocks response with thenReturn for multiple fetches", async () => {
  when(get("https://example.com")).thenReturn(ok({ response: "success" }));

  const response = await fetchExample();
  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json).toStrictEqual({ response: "success" });

  const response2 = await fetchExample();
  const json2 = await response2.json();

  expect(response2.status).toBe(200);
  expect(json2).toStrictEqual({ response: "success" });
});

test("mocks response with then", async () => {
  when(get("https://example.com")).then((req, res, ctx) =>
    res(ctx.status(200), ctx.json({ response: "success" }))
  );

  const response = await fetchExample();
  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json).toStrictEqual({ response: "success" });
});

test("mocks response with then for multiple fetches", async () => {
  when(get("https://example.com")).then((req, res, ctx) =>
    res(ctx.status(200), ctx.json({ response: "success" }))
  );

  const response = await fetchExample();
  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json).toStrictEqual({ response: "success" });

  const response2 = await fetchExample();
  const json2 = await response2.json();

  expect(response2.status).toBe(200);
  expect(json2).toStrictEqual({ response: "success" });
});
