const response = (status, body = null) => ({ status, body });

const ok = (body = null) => response(200, body);
const created = (body = null) => response(201, body);
const accepted = (body = null) => response(202, body);
const badRequest = (body = null) => response(400, body);
const unauthorized = (body = null) => response(401, body);
const notFound = (body = null) => response(404, body);

const data = (body) => ({ responseBody: body });
const errors = (errors) => ({ errors });

module.exports = {
  ok,
  created,
  accepted,
  badRequest,
  unauthorized,
  notFound,
  response,
  data,
  errors,
};
