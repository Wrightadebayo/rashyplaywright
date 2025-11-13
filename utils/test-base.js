const base = require("@playwright/test");

// Create a custom test with testDataForOrder fixture
const customtest = base.test.extend({
  testDataForOrder: async ({}, use) => {
    const data = {
      username: "wrightadebayo80@gmail.com",
      password: "Computer30",
      productName: "ZARA COAT 3",
    };
    await use(data);
  },
});

module.exports = { customtest, expect: base.expect };
