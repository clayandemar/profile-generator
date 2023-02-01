const Manager = require("../lib/Manager");

test('Test instantiation of Manager', () => {
  expect(new Manager()).toBe(!null);
})