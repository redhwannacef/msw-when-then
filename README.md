<p align="center">
  <img alt="logo" src="docs/static/img/logo.svg" width="300" />
</p>

<h1 align="center">MSW When Then</h1>
<h4 align="center">A non-invasive `when-then` style API for <a href="https://mswjs.io/" target="_blank" rel="noopener noreferrer">MSW</a>.</h4>

<p align="center">
  <a href="https://www.npmjs.com/package/msw-when-then" target="_blank" rel="noopener noreferrer">
    <img alt="Npm Version" src="https://img.shields.io/npm/v/msw-when-then">
  </a>
  <a href="https://github.com/redhwannacef/msw-when-then/actions?query=workflow%3ATests" target="_blank" rel="noopener noreferrer">
    <img alt="Test status" src="https://github.com/redhwannacef/msw-when-then/workflows/Tests/badge.svg" />
  </a>
</p>

## Why?

[MSW](https://mswjs.io/) is a brilliant tool for mocking, but is missing a few things to make it perfect for testing.
msw-when-then aims to help with that.

## Notable Features

- Succinct `when-then` style Api
- Mock Chaining
- Implicitly assert request data is correct
- Support for both Rest and GraphQL requests

## Installation

`npm install msw-when-then`

## Usage

### Initialise using MSW `server` and `rest`:

```js
import { whenThen, get, ok } from "msw-when-then";

const { when } = whenThen(server, rest);
```

### Then in your test:

```js
when(get("https://some.url")).thenReturn(ok({ foo: "bar" }));
```

---

## Features

### Chaining Mocks

Familiar chaining pattern, the responses are return in order with the last response returned for all subsequent requests.

```js
import { get, badRequest, ok } from "msw-when-then";

when(get("https://some.url"))
  .thenReturn(badRequest({ response: "first request" }))
  .thenReturn(ok({ response: "subsequent requests" }));
```

### Custom Resolvers

Sometimes you need to take things into your own hands. We expose the original MSW resolver function, so you can do whatever you like.
See [MSW Docs](https://mswjs.io/docs/basics/response-resolver) for more details.

```js
import { get } from "msw-when-then";

when(get("https://some.url")).then((req, res, ctx) => {
  // Any additional logic here
  return res(ctx.status(400), ctx.json({ response: "last response" }));
});
```

### Implicitly assert request data

Mocking APIs is great, but how can we ensure our app is sending the right data? We can do this by specifying the expected
request data when mocking.

_Note: The `id` key in the `withParams` here matches the `:id` argument in the `post` url_

```js
import { post, request, withBody, withHeaders, withParams, ok } from "msw-when-then";

when(post("https://some.url/:id")).thenReturnFor(
  request(
    withBody({ foo: "bar" }),
    withHeaders({ "content-type": "application/json" }),
    withParams({ id: "expected-id" })
  ),
  ok({ response: "success" })
);
```
