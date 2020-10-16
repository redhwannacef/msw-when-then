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
const { get, post, put, _delete, patch, options, mask } = require("./RestMethods");
const { request, withBody, withHeaders, withParams, withSearchParams } = require("./Request");

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
  mask,
  request,
  withBody,
  withHeaders,
  withParams,
  withSearchParams,
};
