---
id: getting-started_install
title: Install
sidebar_label: Install
slug: /getting-started/install
---

## Prerequisites

msw-when-then is a non-invasive library and currently provides an additional layer on top of [MSW](https://mswjs.io/).
This means that you need MSW is installed and set up. You can find out more about that here: https://mswjs.io/docs/getting-started/install.

## Install

To get started, install `msw-when-then` using `npm` or `yarn`. This is usually installed as a dev dependency:

```shell script
npm install --save-dev msw-when-then
```

## Setup

`msw-when-then` makes no assumptions on how you have set up MSW. All that is required is for you to pass the `server` and `rest`
instances and you are good to go:

```js
import { server, rest } from "your-existing-msw-setup";

import { whenThen } from "msw-when-then";

const { when } = whenThen(server, rest);
```

and that's it! You can now start mocking:

```js
test('test using msw-when-then', async () => {
  //...  
  when(get("https://some.url")).thenReturn(ok({ foo: "bar" }));
  //...
})
```