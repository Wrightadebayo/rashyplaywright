const { test, expect } = require("@playwright/test");

test("security request test", async ({ page }) => {
  const email = "wrightadebayo80@gmail.com";
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");

  // 1️⃣ Login
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").pressSequentially(email, { delay: 150 });
  await page.locator("#userPassword").fill("Computer30");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  await page.locator("button[routerlink*='myorders']").click();
  // 2️⃣ Intercept and modify network request
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=68ff9da2f669d6cb0a2f9af5",
      })
  );

  // 3️⃣ Trigger the network request
  await page.locator('button:has-text("view")').first().click();

  await expect(page.locator(".blink_me")).toHaveText(
    "You are not authorize to view this order"
  );
  // 4️⃣ Pause for inspection
  await page.pause();
});
