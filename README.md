# msw-when-then

A non-invasive '`when-then`' style API for [MSW](https://mswjs.io/).

## Why?

[MSW](https://mswjs.io/) is a brilliant tool for mocking, but is missing a few things to make it perfect for testing.
msw-when-then aims to help with that.

## Notable Features

- Succinct `when-then` style Api
- Mock Chaining
- Easily mock based on request details

## Installation

`npm install msw-when-then`

## Usage

### Examples

__Basic Example__

```js
const { rest } = require("msw");
const { setupServer } = require("msw/node");
const { whenThen, get, ok, badRequest, request, withBody, withHeaders, withParams } = require("msw-when-then");
const fetch = require("node-fetch");

const server = setupServer();

const { when } = whenThen(server, rest);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const httpRequest = (path, init) => fetch(path, init).then((res) => res);

// Simple Mock
test("mocks api", async () => {
  when(get("https://example.com")).thenReturn(ok({ response: "first response" }));

  const response1 =  await httpRequest("https://example.com");
  const json1 = await response1.json();

  expect(response1.status).toBe(200);
  expect(json1).toStrictEqual({ response: "first response" });
});

// Chaining Mocks
test("mocks chained responses with mix of thenReturn and then", async () => {
  when(get("https://example.com"))
    .thenReturn(ok({ response: "first response" }))
    .then((req, res, ctx) => res(ctx.status(400), ctx.json({ response: "last response" })));

  const response1 = await httpRequest("https://example.com");
  const json1 = await response1.json();

  expect(response1.status).toBe(200);
  expect(json1).toStrictEqual({ response: "first response" });

  const response2 = await httpRequest("https://example.com");
  const json2 = await response2.json();

  expect(response2.status).toBe(400);
  expect(json2).toStrictEqual({ response: "last response" });

  const response3 = await httpRequest("https://example.com");
  const json3 = await response3.json();

  expect(response3.status).toBe(400);
  expect(json3).toStrictEqual({ response: "last response" });
});

// Mocking with explicit request data
test("mocks api given the correct request data", async () => {
  when(post("https://example.com/:id")).thenReturnFor(
    request(
      withBody({ "some-body-key": "some body value" }),
      withHeaders({ "content-Type": "application/json" }),
      withParams({ id: "some-id" })
    ),
    ok({ response: "success" })
  );

  const headers = { "content-Type": "application/json" };
  const body = JSON.stringify({ "some-body-key": "some body value" });
  const response = await httpRequest("https://example.com/some-id", {
    method: "POST",
    body,
    headers,
  });
  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json).toStrictEqual({ response: "success" });
});
```