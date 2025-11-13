const { test, expect, request } = require("@playwright/test");
const { APiUtils } = require("../utils/APiUtils");
const loginPayLoad = {
  userEmail: "wrightadebayo80@gmail.com",
  userPassword: "Computer30",
};
const orderPayLoad = {
  orders: [{ country: "India", productOrderedId: "68a961459320a140fe1ca57a" }],
};
const fakePayloadsOrders = { data: [], message: "No Orders" };

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
});

//create order is success
test.skip("@API Place the order", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      const response = await page.request.fetch(route.request());

      let body = JSON.stringify(fakePayloadsOrders);

      route.fulfill({
        response,
        body,
      });

      // intercepting the response -> Api response ->{playwright fakeresponse}->browsers->render data
    }
  );

  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"
  );
  console.log(await page.locator(".mt-4").textContent());

  //  await page.locator("tbody").waitFor();
});

//Verify if order created is showing in history page
// Precondition - create order
