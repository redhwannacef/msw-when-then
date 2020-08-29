const { get, post, put, _delete, patch, options, mask } = require("./RestMethods");

test("get returns method with url", () => {
  expect(get("some url")).toStrictEqual({
    method: "get",
    url: "some url",
  });
});

test("post returns method with url", () => {
  expect(post("some url")).toStrictEqual({
    method: "post",
    url: "some url",
  });
});

test("put returns method with url", () => {
  expect(put("some url")).toStrictEqual({
    method: "put",
    url: "some url",
  });
});
test("_delete returns method with url", () => {
  expect(_delete("some url")).toStrictEqual({
    method: "delete",
    url: "some url",
  });
});

test("patch returns method with url", () => {
  expect(patch("some url")).toStrictEqual({
    method: "patch",
    url: "some url",
  });
});

test("options returns method with url", () => {
  expect(options("some url")).toStrictEqual({
    method: "options",
    url: "some url",
  });
});

test("mask returns method with url", () => {
  expect(mask("some method", "some url")).toStrictEqual({
    method: "some method",
    url: "some url",
  });
});
