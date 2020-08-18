const request = (...requestData) => Object.assign({}, ...requestData);

const withBody = (body) => ({ body });
const withHeaders = (headers) => ({ headers });
const withParams = (params) => ({ params });

module.exports = {
  request,
  withBody,
  withHeaders,
  withParams,
};
