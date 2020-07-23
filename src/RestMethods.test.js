const { get, post, put, _delete, patch, options, mask } = require("./RestMethods");

test("get returns method with regex", () => {
  expect(get("some regex")).toStrictEqual({
    method: "get",
    regex: "some regex",
  });
});

test("post returns method with regex", () => {
  expect(post("some regex")).toStrictEqual({
    method: "post",
    regex: "some regex",
  });
});

test("put returns method with regex", () => {
  expect(put("some regex")).toStrictEqual({
    method: "put",
    regex: "some regex",
  });
});
test("_delete returns method with regex", () => {
  expect(_delete("some regex")).toStrictEqual({
    method: "delete",
    regex: "some regex",
  });
});

test("patch returns method with regex", () => {
  expect(patch("some regex")).toStrictEqual({
    method: "patch",
    regex: "some regex",
  });
});

test("options returns method with regex", () => {
  expect(options("some regex")).toStrictEqual({
    method: "options",
    regex: "some regex",
  });
});

test("mask returns method with regex", () => {
  expect(mask("some method", "some regex")).toStrictEqual({
    method: "some method",
    regex: "some regex",
  });
});

