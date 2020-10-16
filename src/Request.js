const request = (...requestData) => Object.assign({}, ...requestData);

const withBody = (body) => ({ body });
const withHeaders = (headers) => ({ headers });
const withParams = (params) => ({ params });
const withSearchParams = (searchParams) => ({ searchParams });

module.exports = {
  request,
  withBody,
  withHeaders,
  withParams,
  withSearchParams,
};
