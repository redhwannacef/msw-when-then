const mask = (method, regex) => ({ method, regex });

const get = (regex) => mask("get", regex);
const post = (regex) => mask("post", regex);
const put = (regex) => mask("put", regex);
const _delete = (regex) => mask("delete", regex);
const patch = (regex) => mask("patch", regex);
const options = (regex) => mask("options", regex);

module.exports = {
  get,
  post,
  put,
  _delete,
  patch,
  options,
  mask,
};
