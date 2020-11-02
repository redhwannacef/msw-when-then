---
id: features_mocking
title: Mocking
slug: "/features/mocking"
---

At the center of the library is cocking. This is done in a "when then" style.
This hopefully makes it intuitive to read and write:

## Example

When a `get` request is made to `https://some.url` then return a `200` with a body `{ foo: "bar" }`

```js
when(get("https://some.url")).thenReturn(ok({ foo: "bar" }));
```
