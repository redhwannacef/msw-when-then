# msw-when-then

A non-invasive '`when-then`' style API for [MSW](https://mswjs.io/).

## Why?

[MSW](https://mswjs.io/) is a brilliant tool for mocking, but is missing a few things to make it perfect for testing.
msw-when-then aims to help with that.

## Notable Features

- Succinct `when-then` style Api
- Mock Chaining
- Implicitly assert request data is correct

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
when(get("https://example.com")).thenReturn(ok({ foo: "bar" }));
```

---

## Features

### Chaining Mocks

Familiar chaining pattern, the responses are return in order with the last response returned for all subsequent requests.

```js
import { get, badRequest, ok } from "msw-when-then";

when(get("https://example.com"))
  .thenReturn(badRequest({ response: "first request" }))
  .thenReturn(ok({ response: "subsequent requests" }));
```

### Custom Resolvers

Sometimes you need to take things into your own hands. We expose the original MSW resolver function, so you can do whatever you like.
See [MSW Docs](https://mswjs.io/docs/basics/response-resolver) for more details.

```js
import { get } from "msw-when-then";

when(get("https://example.com")).then((req, res, ctx) => {
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

when(post("https://example.com/:id")).thenReturnFor(
  request(
    withBody({ foo: "bar" }),
    withHeaders({ "content-type": "application/json" }),
    withParams({ id: "expected-id" })
  ),
  ok({ response: "success" })
);
```
