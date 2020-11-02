---
id: features_request-assertions
title: Assert Request Data
slug: "/features/request-assertions"
---

`MSW` provides a great way to test api calls without getting stuck in implementation details.
One thing however that is missing is the ability to assert on request data. This can be done in a custom resolver,
but we think it is important enough we have made it a first class citizen.

One way to think of this is by asking the question:

`If I change the logic in a certain part of the application, should my tests fail?`

Usually the answer is yes.
So tying this back, if we were to change the transformation logic that outputs the data so that the wrong data is accidentally
sent as part of the api call, should the test fail? We think it should.

## Example

_Note: The `id` key in the `withParams` here matches the `:id` argument in the `post` url_

```js
when(post("https://some.url/:id")).thenReturnFor(
  request(
    withBody({ foo: "bar" }),
    withHeaders({ "content-type": "application/json" }),
    withParams({ id: "expected-id" })
  ),
  ok({ response: "success" })
);
```

In the above request, the resolver will only match if the request data matches the request specified.