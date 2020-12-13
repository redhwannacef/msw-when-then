const mask = (action, actionName) => ({ action, actionName });

const query = (queryName) => mask("query", queryName);
const mutation = (mutationName) => mask("mutation", mutationName);

module.exports = {
  query,
  mutation,
};
