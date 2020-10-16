const isEqual = require('lodash.isequal');

const contains = (obj, source) =>
  Object.keys(source).every((key) => obj.hasOwnProperty(key) && obj[key] === source[key]);

const whenThen = (server, rest) => {
  const when = ({ method, url }) => {
    let count = 0;
    let resolvers = [];

    const thenReturn = ({ status, body = null }) => {
      const resolver = (req, res, context) => res(context.status(status), context.json(body));
      resolvers.push(resolver);
      return thenFunctions;
    };

    const thenReturnFor = (request, { status, body: responseBody = null }) => {
      const { body: requestBody, headers: requestHeaders, params: requestParams } = request;

      const resolver = (req, res, context) =>
        (!requestBody || isEqual(req.body, requestBody)) &&
        (!requestHeaders || contains(req.headers.map, requestHeaders)) &&
        (!requestParams || isEqual({ ...req.params }, requestParams)) &&
        res(context.status(status), context.json(responseBody));

      resolvers.push(resolver);
      return thenFunctions;
    };

    const then = (resolver = () => {}) => {
      resolvers.push(resolver);
      return thenFunctions;
    };

    const thenFunctions = { thenReturn, thenReturnFor, then };

    const resolver = (count) =>
      count > resolvers.length - 1 ? resolvers[resolvers.length - 1] : resolvers[count];

    server.use(rest[method](url, (req, res, ctx) => resolver(count++)(req, res, ctx)));

    return thenFunctions;
  };

  return { when };
};

module.exports = whenThen;
