const whenThen = require("./WhenThen");
const {
  ok,
  created,
  accepted,
  badRequest,
  unauthorized,
  notFound,
  response,
} = require("./Responses");
const { get, post, put, _delete, patch, options } = require("./RestMethods");

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
