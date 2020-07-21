const response = (status, body) => ({ status, body });

const ok = (body = null) => response(200, body);
const created = (body = null) => response(201, body);
const accepted = (body = null) => response(202, body);
const badRequest = (body = null) => response(400, body);
const unauthorized = (body = null) => response(401, body);
const notFound = (body = null) => response(404, body);

const mask = (method, url) => ({ method, url });

const get = (url) => mask("get", url);
const post = (url) => mask("post", url);
const put = (url) => mask("put", url);
const _delete = (url) => mask("delete", url);
const patch = (url) => mask("patch", url);
const options = (url) => mask("options", url);

const restMethods = (rest) => ({
  get: rest.get,
  post: rest.post,
  put: rest.put,
  delete: rest.delete,
  patch: rest.patch,
  options: rest.options,
});

const restMethod = (method, rest) => restMethods(rest)[method];

const whenThen = (server, rest) => {
  const when = ({ method, url }) => ({
    thenReturn: ({ status, body = null }) => {
      server.use(
        restMethod(method, rest)(url, (req, res, context) =>
          res(context.status(status), context.json(body))
        )
      );
    },
    then: (resolver = () => {}) => {
      server.use(restMethod(method, rest)(url, resolver));
    },
  });
  return { when };
};

module.exports = {
  whenThen,
  ok,
  created,
  accepted,
  badRequest,
  unauthorized,
  notFound,
  response,
  get,
  post,
  put,
  _delete,
  patch,
  options,
};
