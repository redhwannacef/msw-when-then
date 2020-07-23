const restMethod = (method, rest) => rest[method];

const whenThen = (server, rest) => {
  const when = ({ method, regex }) => ({
    thenReturn: ({ status, body = null }) => {
      server.use(
        restMethod(method, rest)(regex, (req, res, context) =>
          res(context.status(status), context.json(body))
        )
      );
    },
    then: (resolver = () => {}) => {
      server.use(restMethod(method, rest)(regex, resolver));
    },
  });
  return { when };
};

module.exports = whenThen;
