---
id: features_custom-resolvers
title: Custom Resolvers
slug: "/features/custom-resolvers"
---

We provide useful APIs for performing the most standard tasks when mocking, but sometimes you might come across and edge case scenario and simply need to take things into your own hands.

For these scenarios we simply expose the resolvers that power `msw` behind the scenes. This way you can do whatever you need with full access to the request.

You can find more on the resolver functions here: https://mswjs.io/docs/basics/response-resolver.

## Example

```js
when(get("https://some.url")).then((req, res, ctx) => {
  // req - The capture request 
  // res - Function to create a response 
  // req - Helper functions to help create the response 

  // Any additional logic here

  return res(ctx.status(200), ctx.json({ response: "some response" }));
});
```
