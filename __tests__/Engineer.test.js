const Engineer = require("../lib/Engineer");

test('Test instantiation of Engineer', () => {
  expect(new Engineer()).toBe(!null);
})