# msw-when-then

A non-invasive '`when-then`' style API for [MSW](https://mswjs.io/).

## Why?

[MSW](https://mswjs.io/) is a brilliant tool for mocking, but I find it is a little too verbose when writing tests.
msw-when-then aims to help with that.

## Installation

`npm install msw-when-then`

## Usage

### Basic Example

```js
//...

import { render } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { whenThen, ok, get, badRequest } from "msw-when-then";

const server = setupServer();

const { when } = whenThen(server, rest);

test("displays message for given url", async () => {
  when(get("https://someurl")).thenReturn(ok({ message: "success" }));

  const { findByText } = render(<DisplayMessage url="https://someurl" />);

  expect(await findByText("success")).toBeInTheDocument();
});

test("displays error when fetch fails", async () => {
  when(get("https://someurl")).thenReturn(badRequest());

  const { findByText } = render(<DisplayMessage url="https://someurl" />);

  expect(await findByText("error")).toBeInTheDocument();
});

//...

```

### Custom Resolver

```js
//...

test("displays message for given url", async () => {
  when(get("https://someurl")).then((req, res, ctx) => res(ctx.status(200)));

  const { findByText } = render(<DisplayMessage url="https://someurl" />);

  expect(await findByText("success")).toBeInTheDocument();
});

//...

```