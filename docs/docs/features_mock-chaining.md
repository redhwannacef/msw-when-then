---
id: features_mock-chaining
title: Mock Chaining
slug: "/features/mock-chaining"
---

There are often scenarios where you may make the same call to the same api and expect different results, this is where mock chaining comes in.
In `msw-when-then`, the requests are returned in order of calls with the last defined mock returning on all subsequent requests.

## Examples

You may have auto retry functionality and you want to test that your if the first api call fails and the second succeeds, the user does not see anything out of the ordinary:

```js
when(get("https://some.url"))
  .thenReturn(badRequest({ response: "first request" }))
  .thenReturn(ok({ response: "subsequent requests" }));
```

Another scenario is simply adding to a list.

```js
when(post("https://create-users.url"))
  .thenReturn(ok({ users: ["Alice"] }))
  .thenReturn(ok({ users: ["Alice", "Bob"] }));
```
