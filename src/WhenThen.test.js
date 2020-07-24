const whenThen = require("./WhenThen");
const { get } = require("./RestMethods");
const { ok } = require("./Responses");

test("calls msw with thenReturn", () => {
  const mockServer = {
    use: jest.fn(),
  };
  const mockRest = {
    get: jest.fn().mockReturnValue("called"),
  };

  const { when } = whenThen(mockServer, mockRest);
  when(get("some url")).thenReturn(ok());

  expect(mockRest.get).toBeCalledWith("some url", expect.any(Function));
  expect(mockServer.use).toBeCalledWith("called");
});

test("calls msw with then", () => {
  const mockServer = {
    use: jest.fn(),
  };
  const mockRest = {
    get: jest.fn().mockReturnValue("called"),
  };

  const someFunction = () => {};

  const { when } = whenThen(mockServer, mockRest);
  when(get("some url")).then(someFunction);

  expect(mockRest.get).toBeCalledWith("some url", expect.any(Function));
  expect(mockServer.use).toBeCalledWith("called");
});
