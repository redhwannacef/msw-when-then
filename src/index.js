const whenThen = require("./WhenThen");
const whenThenGraphQL = require("./WhenThenGraphQL");
const {
  ok,
  data,
  errors,
  created,
  accepted,
  badRequest,
  unauthorized,
  notFound,
  response,
} = require("./Responses");
const {
  get,
  post,
  put,
  _delete,
  patch,
  options,
  mask,
} = require("./RestMethods");
const { query, mutation } = require("./GraphQLActions");
const {
  request,
  withBody,
  withHeaders,
  withParams,
  withSearchParams,
} = require("./Request");

module.exports = {
  whenThen,
  whenThenGraphQL,
  ok,
  data,
  errors,
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
  mutation,
  query,
  options,
  mask,
  request,
  withBody,
  withHeaders,
  withParams,
  withSearchParams,
};
