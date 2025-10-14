const { test, expect, request } = require('@playwright/test');

const loginPayload = { userEmail: 'wrightadebayo80@gmail.com', userPassword: 'Computer30' };
const orderPayload = { orders: [{ country: "India", productOrderedId: "68a961459320a140fe1ca57a" }] };

let token;
let orderId;

test.beforeAll(async () => {
  // Login API
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
    data: loginPayload
  });

  expect(loginResponse.ok()).toBeTruthy();

  const loginResponseJson = await loginResponse.json();
  token = loginResponseJson.token;
  console.log("Token:", token);

  // Order API
  const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
    data: orderPayload,
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    },
  });

  expect(orderResponse.ok()).toBeTruthy();

  const orderResponseJson = await orderResponse.json();
  console.log("Order Response:", orderResponseJson);

  orderId = orderResponseJson.orders[0];
  console.log("Order ID:", orderId);
});

test('webApi test script', async ({ page }) => {
  // Inject token into localStorage before page load
  await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, token);

  await page.goto("https://rahulshettyacademy.com/client");

  await page.waitForLoadState('networkidle');

  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();

  const rows = await page.locator("tbody tr");

  for (let i = 0; i < await rows.count(); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();
  await page.pause();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
