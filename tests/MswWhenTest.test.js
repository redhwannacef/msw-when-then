const { rest } = require("msw");
const { setupServer } = require("msw/node");
const { whenThen, get, post, ok, request, withBody, withHeaders, withParams } = require("../src");
const fetch = require("node-fetch");

const server = setupServer();

const { when } = whenThen(server, rest);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const httpRequest = (path, init) => fetch(path, init).then((res) => res);

test("mocks response with thenReturn", async () => {
  when(get("https://some.url")).thenReturn(ok({ response: "success" }));

  const response = await httpRequest("https://some.url");
  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json).toStrictEqual({ response: "success" });
});

test("mocks response with thenReturn for multiple fetches", async () => {
  when(get("https://some.url")).thenReturn(ok({ response: "success" }));

  const response = await httpRequest("https://some.url");
  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json).toStrictEqual({ response: "success" });

  const response2 = await httpRequest("https://some.url");
  const json2 = await response2.json();

  expect(response2.status).toBe(200);
  expect(json2).toStrictEqual({ response: "success" });
});

test("mocks response with then", async () => {
  when(get("https://some.url")).then((req, res, ctx) =>
    res(ctx.status(200), ctx.json({ response: "success" }))
  );

  const response = await httpRequest("https://some.url");
  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json).toStrictEqual({ response: "success" });
});

test("mocks response with then for multiple fetches", async () => {
  when(get("https://some.url")).then((req, res, ctx) =>
    res(ctx.status(200), ctx.json({ response: "success" }))
  );

  const response = await httpRequest("https://some.url");
  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json).toStrictEqual({ response: "success" });

  const response2 = await httpRequest("https://some.url");
  const json2 = await response2.json();

  expect(response2.status).toBe(200);
  expect(json2).toStrictEqual({ response: "success" });
});

test("mocking response with empty request data acts like thenReturn", async () => {
  when(post("https://some.url")).thenReturnFor(request(), ok({ response: "success" }));

  const response = await httpRequest("https://some.url", {
    method: "POST",
  });
  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json).toStrictEqual({ response: "success" });
});

test("mocks response including json body data", async () => {
  when(post("https://some.url")).thenReturnFor(
    request(withBody({ "some-key": "some value" })),
    ok({ response: "success" })
  );

  const headers = { "content-Type": "application/json" };
  const body = JSON.stringify({ "some-key": "some value" });
  const response = await httpRequest("https://some.url", {
    method: "POST",
    headers,
    body,
  });
  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json).toStrictEqual({ response: "success" });
});

test("mocks response including json array body data", async () => {
  when(post("https://some.url")).thenReturnFor(
    request(withBody([{ "some-key": "some value" }])),
    ok({ response: "success" })
  );

  const headers = { "content-Type": "application/json" };
  const body = JSON.stringify([{ "some-key": "some value" }]);
  const response = await httpRequest("https://some.url", {
    method: "POST",
    headers,
    body,
  });
  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json).toStrictEqual({ response: "success" });
});

test("mocks response including json body with embedded array data", async () => {
  when(post("https://some.url")).thenReturnFor(
    request(withBody({ "some-key": ["some value"] })),
    ok({ response: "success" })
  );

  const headers = { "content-Type": "application/json" };
  const body = JSON.stringify({ "some-key": ["some value"] });
  const response = await httpRequest("https://some.url", {
    method: "POST",
    headers,
    body,
  });
  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json).toStrictEqual({ response: "success" });
});

test("mocks response including text body data", async () => {
  when(post("https://some.url")).thenReturnFor(
    request(withBody("some value")),
    ok({ response: "success" })
  );

  const headers = { "content-Type": "application/text" };
  const body = "some value";
  const response = await httpRequest("https://some.url", {
    method: "POST",
    headers,
    body,
  });
  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json).toStrictEqual({ response: "success" });
});

test("mocks response including header data", async () => {
  when(post("https://some.url")).thenReturnFor(
    request(withHeaders({ "content-type": "application/json" })),
    ok({ response: "success" })
  );

  const headers = { "content-type": "application/json" };
  const response = await httpRequest("https://some.url", {
    method: "POST",
    headers,
  });
  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json).toStrictEqual({ response: "success" });
});

test("mocks response including params", async () => {
  when(post("https://some.url/:id")).thenReturnFor(
    request(withParams({ id: "some-id" })),
    ok({ response: "success" })
  );

  const response = await httpRequest("https://some.url/some-id", {
    method: "POST",
  });
  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json).toStrictEqual({ response: "success" });
});

test("mocks response including body, headers and params", async () => {
  when(post("https://some.url/:id")).thenReturnFor(
    request(
      withBody({ "some-body-key": "some body value" }),
      withHeaders({ "content-type": "application/json" }),
      withParams({ id: "some-id" })
    ),
    ok({ response: "success" })
  );

  const headers = { "content-type": "application/json" };
  const body = JSON.stringify({ "some-body-key": "some body value" });
  const response = await httpRequest("https://some.url/some-id", {
    method: "POST",
    body,
    headers,
  });
  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json).toStrictEqual({ response: "success" });
});

test("mocks response fails without correct body data", async () => {
  when(post("https://some.url")).thenReturnFor(
    request(withBody("some value")),
    ok({ response: "success" })
  );

  const testRequest = async () =>
    await httpRequest("https://some.url", {
      method: "POST",
      body: "some other value",
    });

  await expect(testRequest()).rejects.toThrow();
});

test("mocks response fails without correct header data", async () => {
  when(post("https://some.url")).thenReturnFor(
    request(withHeaders({ "some-header-key": "some header value" })),
    ok({ response: "success" })
  );

  const testRequest = async () =>
    await httpRequest("https://some.url", {
      method: "POST",
      headers: { "some-other-header-key": "some other header value" },
    });

  await expect(testRequest()).rejects.toThrow();
});

test("mocks response fails without correct params", async () => {
  when(post("https://some.url/:id")).thenReturnFor(
    request(withParams({ id: "some-id" })),
    ok({ response: "success" })
  );

  const testRequest = async () =>
    await httpRequest("https://some.url/some-other-id", {
      method: "POST",
    });

  await expect(testRequest()).rejects.toThrow();
});
