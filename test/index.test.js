const { add, err, promiseTest, arr, app } = require("../index");
const supertest = require("supertest"); // node library that helps with API testing
const { request } = require("express");

//many different types of tests can be defined. here are a few examples
test("toBe", () => {
  expect(add(1, 2)).toBe(3);
});

test("toEqual", () => {
  expect(add(1, 2)).toEqual(3);
});

test("toBeDefined", () => {
  expect(add(1, 2)).toBeDefined();
});

test("toBeNull", () => {
  expect(add(1, 2)).not.toBeNull();
});

test("toBeGreaterThan", () => {
  expect(add(1, 2)).toBeGreaterThan(1);
});

test("toBeLessThan", () => {
  expect(add(1, 2)).toBeLessThan(4);
});

test("toMatch", () => {
  expect(add("Hello", "World")).toMatch(/Hello/);
});

// toThrow errors need to be run as functions in the expect
test("toThrow", () => {
  expect(() => err()).toThrow("I am new Error");
});

//Many testcases in the same series of test are run in a block
describe("I am block", () => {
  test("I am executing in a block", () => {
    expect(() => err()).toThrow("I am new Error");
  });
  test("toThrow", () => {
    expect(() => err()).toThrow("I am new Error");
  });
});

// testing of promises with a then function where we can catch errors
test("promiseTest", () => {
  promiseTest(1, 2)
    .then((data) => {
      expect(data).toBe("+ve");
    })
    .catch((e) => {
      expect(e).toBe("-ve");
    });
});

// to write the promise case in an shorter way

test("promiseTest shorter", () => {
  expect(promiseTest(2, 1)).resolves.toBe("+ve");
});

test("promiseTest rejected", () => {
  expect(promiseTest(1, 2)).rejects.toBe("-ve");
});

// test of array types
test("toContain", () => {
  expect(arr()).toContain("Bat");
});

// test of api get
test("toContain", async () => {
  await supertest(app)
    .get("/users")
    .expect(200)
    .then((result) => {
      expect(result && result.body && typeof result.body === "object");
    });
});
