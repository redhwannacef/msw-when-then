const { graphql } = require("msw");
const { setupServer } = require("msw/node");
const {
  whenThenGraphQL,
  data,
  errors,
  query,
  mutation,
  request,
  withHeaders,
} = require("../src");
const fetch = require("node-fetch");

const server = setupServer();

const { when } = whenThenGraphQL(server, graphql);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const graphqlAction = (url, query, options={}) => {
  const contentTypeHeader = { 'Content-Type': 'application/json'}
  const headers = options.headers ? {...contentTypeHeader, ...options.headers} : contentTypeHeader;

  const allOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify({ query })
  }

  return fetch(url, allOptions);
}

const buildQuery = (queryName) => `
  query ${queryName} {
    user {
      id
    }
  }
`;

const buildMutation = (queryName) => `
  mutation ${queryName} {
    user {
      id
    }
  }
`;

const graphqlQuery = (queryName, options) => 
  graphqlAction("https://some.url", buildQuery(queryName), options);
const graphqlMutation = (mutationName, options) => 
  graphqlAction("https://some.url", buildMutation(mutationName), options);

test("mocks query response with thenReturn", async () => {
  when(query("TestQuery")).thenReturn(data({ response: "success" }));

  const response = await graphqlQuery('TestQuery');

  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json.data).toStrictEqual({ response: "success" });
});

test("mocks mutation response with thenReturn", async () => {
  when(mutation("TestMutation")).thenReturn(data({ response: "success" }));

  const response = await graphqlMutation('TestMutation');

  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json.data).toStrictEqual({ response: "success" });
});

test("mocks query response with thenReturn for multiple fetches", async () => {
  when(query("TestQuery")).thenReturn(data({ response: "success" }));

  const response = await graphqlQuery('TestQuery');
  const json = await response.json();
  
  expect(response.status).toBe(200);
  expect(json.data).toStrictEqual({ response: "success" });
  
  const response2 = await graphqlQuery('TestQuery');
  const json2 = await response2.json();

  expect(response2.status).toBe(200);
  expect(json2.data).toStrictEqual({ response: "success" });
});

test("mocks mutation response with thenReturn for multiple fetches", async () => {
  when(mutation("TestMutation")).thenReturn(data({ response: "success" }));

  const response = await graphqlMutation('TestMutation');
  const json = await response.json();
  
  expect(response.status).toBe(200);
  expect(json.data).toStrictEqual({ response: "success" });
  
  const response2 = await graphqlMutation('TestMutation');
  const json2 = await response2.json();

  expect(response2.status).toBe(200);
  expect(json2.data).toStrictEqual({ response: "success" });
});

test("mocks query response with then", async () => {
  when(query("TestQuery")).then((req, res, ctx) =>
    res(ctx.data({ response: "success" }))
  );

  const response = await graphqlQuery('TestQuery');
  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json.data).toStrictEqual({ response: "success" });
});

test("mocks mutation response with then", async () => {
  when(mutation("TestMutation")).then((req, res, ctx) =>
    res(ctx.data({ response: "success" }))
  );

  const response = await graphqlMutation('TestMutation');
  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json.data).toStrictEqual({ response: "success" });
});

test("mocks query response with then for multiple fetches", async () => {
  when(query("TestQuery")).then((req, res, ctx) =>
    res(ctx.data({ response: "success" }))
  );

  const response = await graphqlQuery('TestQuery');
  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json.data).toStrictEqual({ response: "success" });

  const response2 = await graphqlQuery('TestQuery');
  const json2 = await response2.json();

  expect(response2.status).toBe(200);
  expect(json2.data).toStrictEqual({ response: "success" });
});

test("mocks mutation response with then for multiple fetches", async () => {
  when(mutation("TestMutation")).then((req, res, ctx) =>
    res(ctx.data({ response: "success" }))
  );

  const response = await graphqlMutation('TestMutation');
  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json.data).toStrictEqual({ response: "success" });

  const response2 = await graphqlMutation('TestMutation');
  const json2 = await response2.json();

  expect(response2.status).toBe(200);
  expect(json2.data).toStrictEqual({ response: "success" });
});

test("mocking query response with empty request data acts like thenReturn", async () => {
  when(query("TestQuery")).thenReturnFor(
    request(),
    data({ response: "success" })
  );

  const response = await graphqlQuery('TestQuery');

  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json.data).toStrictEqual({ response: "success" });
});

test("mocking mutation response with empty request data acts like thenReturn", async () => {
  when(mutation("TestMutation")).thenReturnFor(
    request(),
    data({ response: "success" })
  );

  const response = await graphqlMutation('TestMutation');

  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json.data).toStrictEqual({ response: "success" });
});

test("mocks query response including header data", async () => {
  when(query("TestQuery")).thenReturnFor(
    request(withHeaders({ "some-header": "some-header-value" })),
    data({ response: "success" })
  );

  const headers = { "some-header": "some-header-value" };
  const response = await graphqlQuery('TestQuery', {headers});

  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json.data).toStrictEqual({ response: "success" });
});

test("mocks mutation response including header data", async () => {
  when(mutation("TestMutation")).thenReturnFor(
    request(withHeaders({ "some-header": "some-header-value" })),
    data({ response: "success" })
  );

  const headers = { "some-header": "some-header-value" };
  const response = await graphqlMutation('TestMutation', {headers});

  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json.data).toStrictEqual({ response: "success" });
});

test("query response mock fails without correct queryName", async () => {
  when(query("TestQuery")).thenReturnFor(
    request(),
    data({ response: "success" })
  );

  const testRequest = async () =>
    await graphqlQuery('AnotherQuery');
  
  await expect(testRequest()).rejects.toThrow();
});

test("mutation response mock fails without correct queryName", async () => {
  when(mutation("TestMutation")).thenReturnFor(
    request(),
    data({ response: "success" })
  );

  const testRequest = async () =>
    await graphqlMutation('AnotherMutation');
  
  await expect(testRequest()).rejects.toThrow();
});

test("query response fails without correct header data", async () => {
  when(query("TestQuery")).thenReturnFor(
    request(withHeaders({ "some-header": "some-header-value" })),
    data({ response: "success" })
  );

  const testRequest = async () =>
   await graphqlQuery('TestQuery', 
      {headers: { "some-header": "some other header value" }});

  await expect(testRequest()).rejects.toThrow();
});

test("mutation response fails without correct header data", async () => {
  when(mutation("TestMutation")).thenReturnFor(
    request(withHeaders({ "some-header": "some-header-value" })),
    data({ response: "success" })
  );

  const testRequest = async () =>
   await graphqlMutation('TestMutation', 
      {headers: { "some-header": "some other header value" }});

  await expect(testRequest()).rejects.toThrow();
});

test("mocks query response returning errors", async () => {
  when(query("TestQuery")).thenReturn(
    errors([{ message: "test error" }])
  );

  const response = await graphqlQuery('TestQuery');

  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json.errors).toStrictEqual([{ message: "test error" }]);
});

test("mocks mutation response returning errors", async () => {
  when(mutation("TestMutation")).thenReturn(
    errors([{ message: "test error" }])
  );

  const response = await graphqlMutation('TestMutation');

  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json.errors).toStrictEqual([{ message: "test error" }]);
});

test("mocks query response returning errors with ", async () => {
  when(query("TestQuery")).thenReturn(
    errors([{ message: "test error" }])
  );

  const response = await graphqlQuery('TestQuery');

  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json.errors).toStrictEqual([{ message: "test error" }]);
});

test("mocks query response returning errors with thenReturnFor", async () => {
  when(query("TestQuery")).thenReturnFor(
    request(),
    errors([{ message: "test error" }])
  );

  const response = await graphqlQuery('TestQuery');

  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json.errors).toStrictEqual([{ message: "test error" }]);
});

test("mocks mutation response returning errors with thenReturnFor", async () => {
  when(mutation("TestMutation")).thenReturnFor(
    request(),
    errors([{ message: "test error" }])
  );

  const response = await graphqlMutation('TestMutation');

  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json.errors).toStrictEqual([{ message: "test error" }]);
});
