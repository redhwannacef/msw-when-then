const { request, withBody, withHeaders, withParams } = require("./Request");

test("request merges objects", () => {
  expect(request({ first: 1 }, { second: 2 })).toStrictEqual({ first: 1, second: 2 });
});

test("withBody create object with body key", () => {
  expect(withBody({ someKey: "some value" })).toStrictEqual({ body: { someKey: "some value" } });
});

test("withHeaders create object with headers key", () => {
  expect(withHeaders({ someKey: "some value" })).toStrictEqual({
    headers: { someKey: "some value" },
  });
});

test("withParams create object with params key", () => {
  expect(withParams({ someKey: "some value" })).toStrictEqual({
    params: { someKey: "some value" },
  });
});
