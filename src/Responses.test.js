const {
  ok,
  created,
  accepted,
  badRequest,
  unauthorized,
  notFound,
  response,
} = require("./Responses");

test("ok returns 200 with body", () => {
  expect(ok("some body")).toStrictEqual({ status: 200, body: "some body" });
});

test("ok returns 200 with null body", () => {
  expect(ok()).toStrictEqual({ status: 200, body: null });
});

test("created returns 201 with body", () => {
  expect(created("some body")).toStrictEqual({
    status: 201,
    body: "some body",
  });
});

test("created returns 201 with null body", () => {
  expect(created()).toStrictEqual({
    status: 201,
    body: null,
  });
});

test("accepted returns 202 with body", () => {
  expect(accepted("some body")).toStrictEqual({
    status: 202,
    body: "some body",
  });
});

test("accepted returns 202 with null body", () => {
  expect(accepted()).toStrictEqual({
    status: 202,
    body: null,
  });
});

test("badRequest returns 400 with body", () => {
  expect(badRequest("some body")).toStrictEqual({
    status: 400,
    body: "some body",
  });
});

test("badRequest returns 400 with null body", () => {
  expect(badRequest()).toStrictEqual({
    status: 400,
    body: null,
  });
});

test("unauthorized returns 401 with body", () => {
  expect(unauthorized("some body")).toStrictEqual({
    status: 401,
    body: "some body",
  });
});

test("unauthorized returns 401 with null body", () => {
  expect(unauthorized()).toStrictEqual({
    status: 401,
    body: null,
  });
});

test("notFound returns 404 with body", () => {
  expect(notFound("some body")).toStrictEqual({
    status: 404,
    body: "some body",
  });
});

test("notFound returns 404 with null body", () => {
  expect(notFound()).toStrictEqual({
    status: 404,
    body: null,
  });
});

test("response returns value with body", () => {
  const arbitraryNumber = 1;
  expect(response(arbitraryNumber, "some body")).toStrictEqual({
    status: arbitraryNumber,
    body: "some body",
  });
});

test("response returns value with null body", () => {
  const arbitraryNumber = 1;
  expect(response(arbitraryNumber)).toStrictEqual({
    status: arbitraryNumber,
    body: null,
  });
});
