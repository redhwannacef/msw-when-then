const contains = (obj, source) =>
  Object.keys(source).every(
    (key) => obj.hasOwnProperty(key) && obj[key] === source[key]
  );

const whenThenGraphQL = (server, graphql) => {
  const when = ({ action, actionName }) => {
    let count = 0;
    let resolvers = [];

    const thenReturn = ({ responseBody, errors = [] }) => {
      const resolver = (req, res, context) => {
        return errors.length > 0
          ? res(context.errors(errors))
          : res(context.data(responseBody));
      };
      resolvers.push(resolver);
      return thenFunctions;
    };

    const thenReturnFor = (request, { responseBody, errors = [] }) => {
      const { headers: requestHeaders } = request;

      const resolver = (req, res, context) =>
        (!requestHeaders || contains(req.headers.map, requestHeaders)) &&
        res(
          context.status(status),
          errors.length > 0
            ? context.errors(errors)
            : context.data(responseBody)
        );

      resolvers.push(resolver);
      return thenFunctions;
    };

    const then = (resolver = () => {}) => {
      resolvers.push(resolver);
      return thenFunctions;
    };

    const thenFunctions = { thenReturn, thenReturnFor, then };

    const resolver = (count) =>
      count > resolvers.length - 1
        ? resolvers[resolvers.length - 1]
        : resolvers[count];

    server.use(
      graphql[action](actionName, (req, res, ctx) =>
        resolver(count++)(req, res, ctx)
      )
    );

    return thenFunctions;
  };

  return { when };
};

module.exports = whenThenGraphQL;
