const contains = (obj, source) =>
  Object.keys(source).every((key) => obj.hasOwnProperty(key) && obj[key] === source[key]);

const matches = (obj, source) =>
  typeof obj === "string"
    ? obj === source
    : Object.keys(obj).length === Object.keys(source).length && contains(obj, source);

const whenThen = (server, rest) => {
  const when = ({ method, regex }) => {
    let count = 0;
    let resolvers = [];

    const thenReturn = ({ status, body = null }) => {
      const resolver = (req, res, context) => res(context.status(status), context.json(body));
      resolvers.push(resolver);
      return { thenReturn, thenReturnFor, then };
    };

    const thenReturnFor = (request, { status, body: responseBody = null }) => {
      const { body: requestBody, headers: requestHeaders, params: requestParams } = request;

      const resolver = (req, res, context) =>
        (!requestBody || matches(req.body, requestBody)) &&
        (!requestHeaders || contains(req.headers.map, requestHeaders)) &&
        (!requestParams || matches({ ...req.params }, requestParams)) &&
        res(context.status(status), context.json(responseBody));

      resolvers.push(resolver);
      return { thenReturn, thenReturnFor, then };
    };

    const then = (resolver = () => {}) => {
      resolvers.push(resolver);
      return { thenReturn, thenReturnFor, then };
    };

    const resolver = (count) =>
      count > resolvers.length - 1 ? resolvers[resolvers.length - 1] : resolvers[count];

    server.use(rest[method](regex, (req, res, ctx) => resolver(count++)(req, res, ctx)));

    return { thenReturn, thenReturnFor, then };
  };

  return { when };
};

module.exports = whenThen;
