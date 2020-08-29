const mask = (method, url) => ({ method, url });

const get = (url) => mask("get", url);
const post = (url) => mask("post", url);
const put = (url) => mask("put", url);
const _delete = (url) => mask("delete", url);
const patch = (url) => mask("patch", url);
const options = (url) => mask("options", url);

module.exports = {
  get,
  post,
  put,
  _delete,
  patch,
  options,
  mask,
};
