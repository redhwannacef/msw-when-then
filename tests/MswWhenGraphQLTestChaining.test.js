const { graphql } = require("msw");
const { setupServer } = require("msw/node");
const { whenThenGraphQL, query, data, errors } = require("../src");
const fetch = require("node-fetch");

const server = setupServer();

const { when } = whenThenGraphQL(server, graphql);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const graphqlQuery = (queryName) => {
  const query = `
    query ${queryName} {
      user {
        id
      }
    }
  `;

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  };

  return fetch("https://some.url", options);
};

test("mocks chained responses with thenReturn", async () => {
  when(query("TestQuery"))
    .thenReturn(data({ response: "response1" }))
    .thenReturn(errors([{ message: "test error" }]));

  const response1 = await graphqlQuery("TestQuery");
  const json1 = await response1.json();

  expect(response1.status).toBe(200);
  expect(json1.data).toStrictEqual({ response: "response1" });

  const response2 = await graphqlQuery("TestQuery");
  const json2 = await response2.json();

  expect(response2.status).toBe(200);
  expect(json2.errors).toStrictEqual([{ message: "test error" }]);
});

test("mocks chained responses with then", async () => {
  when(query("TestQuery"))
    .then((req, res, ctx) => res(ctx.data({ response: "response1" })))
    .then((req, res, ctx) => res(ctx.errors([{ message: "test error" }])));

  const response1 = await graphqlQuery("TestQuery");
  const json1 = await response1.json();

  expect(response1.status).toBe(200);
  expect(json1.data).toStrictEqual({ response: "response1" });

  const response2 = await graphqlQuery("TestQuery");
  const json2 = await response2.json();

  expect(response2.status).toBe(200);
  expect(json2.errors).toStrictEqual([{ message: "test error" }]);
});

test("mocks chained responses with mix of thenReturn and then", async () => {
  when(query("TestQuery"))
    .thenReturn(data({ response: "response1" }))
    .then((req, res, ctx) => res(ctx.errors([{ message: "test error" }])));

  const response1 = await graphqlQuery("TestQuery");
  const json1 = await response1.json();

  expect(response1.status).toBe(200);
  expect(json1.data).toStrictEqual({ response: "response1" });

  const response2 = await graphqlQuery("TestQuery");
  const json2 = await response2.json();

  expect(response2.status).toBe(200);
  expect(json2.errors).toStrictEqual([{ message: "test error" }]);
});

test("last response with chained mocks is used with multiple fetches with then", async () => {
  when(query("TestQuery"))
    .thenReturn(data({ response: "response1" }))
    .then((req, res, ctx) => res(ctx.errors([{ message: "test error" }])));

  const response1 = await graphqlQuery("TestQuery");
  const json1 = await response1.json();

  expect(response1.status).toBe(200);
  expect(json1.data).toStrictEqual({ response: "response1" });

  const response2 = await graphqlQuery("TestQuery");
  const json2 = await response2.json();

  expect(response2.status).toBe(200);
  expect(json2.errors).toStrictEqual([{ message: "test error" }]);

  const response3 = await graphqlQuery("TestQuery");
  const json3 = await response3.json();

  expect(response3.status).toBe(200);
  expect(json3.errors).toStrictEqual([{ message: "test error" }]);
});

test("last response with chained mocks is used with multiple fetches with thenReturn", async () => {
  when(query("TestQuery"))
    .then((req, res, ctx) => res(ctx.data({ response: "response1" })))
    .thenReturn(errors([{ message: "test error" }]));

  const response1 = await graphqlQuery("TestQuery");
  const json1 = await response1.json();

  expect(response1.status).toBe(200);
  expect(json1.data).toStrictEqual({ response: "response1" });

  const response2 = await graphqlQuery("TestQuery");
  const json2 = await response2.json();

  expect(response2.status).toBe(200);
  expect(json2.errors).toStrictEqual([{ message: "test error" }]);

  const response3 = await graphqlQuery("TestQuery");
  const json3 = await response3.json();

  expect(response3.status).toBe(200);
  expect(json3.errors).toStrictEqual([{ message: "test error" }]);
});
