# msw-when-then

A non-invasive '`when-then`' style API for [MSW](https://mswjs.io/).

## Why?

[MSW](https://mswjs.io/) is a brilliant tool for mocking, but is missing a few things to make it perfect for testing.
msw-when-then aims to help with that.

## Notable Features

- Succinct `when-then` style Api
- Mock Chaining

## Installation

`npm install msw-when-then`

## Usage

### Basic Example

```js
const { rest } = require("msw");
const { setupServer } = require("msw/node");
const { whenThen, get, ok, badRequest } = require("msw-when-then");
const fetch = require("node-fetch");

const server = setupServer();

const { when } = whenThen(server, rest);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const fetchExample = () => fetch("https://example.com").then((res) => res);

test("mocks chained responses with mix of thenReturn and then", async () => {
  when(get("https://example.com"))
    .thenReturn(ok({ response: "first response" }))
    .then((req, res, ctx) => res(ctx.status(400), ctx.json({ response: "last response" })));

  const response1 = await fetchExample();
  const json1 = await response1.json();

  expect(response1.status).toBe(200);
  expect(json1).toStrictEqual({ response: "first response" });

  const response2 = await fetchExample();
  const json2 = await response2.json();

  expect(response2.status).toBe(400);
  expect(json2).toStrictEqual({ response: "last response" });

  const response3 = await fetchExample();
  const json3 = await response3.json();

  expect(response3.status).toBe(400);
  expect(json3).toStrictEqual({ response: "last response" });
});
```
