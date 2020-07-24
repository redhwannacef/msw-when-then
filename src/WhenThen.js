const whenThen = (server, rest) => {
  const when = ({ method, regex }) => {
    let count = 0;
    let resolvers = [];

    const thenReturn = ({ status, body = null }) => {
      const resolver = (req, res, context) => res(context.status(status), context.json(body));
      resolvers.push(resolver);
      return { thenReturn, then };
    };

    const then = (resolver = () => {}) => {
      resolvers.push(resolver);
      return { thenReturn, then };
    };

    const resolver = (count) =>
      count > resolvers.length - 1 ? resolvers[resolvers.length - 1] : resolvers[count];

    server.use(rest[method](regex, (req, res, ctx) => resolver(count++)(req, res, ctx)));

    return { thenReturn, then };
  };

  return { when };
};

module.exports = whenThen;
