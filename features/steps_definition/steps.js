// Import Cucumber step definitions
const { When, Then, Given } = require("@cucumber/cucumber");

// Import your Page Object Manager
const { POManager } = require("../../pageobjectmodel/POManager");

// Import Playwright test assertions
const { expect } = require("@playwright/test");

// Import Playwright to interact with the browser
const playwright = require("playwright");

// -------------------------------------------------------
// Step: Login to Ecommerce application (main app)
Given(
  "a login to Ecommerce application with {string} and {string}",
  { timeout: 100 * 1000 }, // ⬅️ allow up to 100 seconds for this step
  async function (username, password) {
    // Get all products on the dashboard
    const products = this.page.locator(".card-body");

    // Get the Login Page object from POManager
    const loginPage = this.poManager.getLoginPage();

    // Navigate to login page
    await loginPage.goTo();

    // Perform login with provided username and password
    await loginPage.validLogin(username, password);

    // Optional: wait for page network to be idle
    // await page.waitForLoadState('networkidle');
  }
);

// -------------------------------------------------------
// Step: Add product to cart
When("Add {string} to the Cart", async function (productName) {
  // Get the Dashboard Page object from POManager
  this.dashboardPage = this.poManager.getDashboardPage();

  // Search for product and add it to cart
  await this.dashboardPage.searchProductAddCart(productName);

  // Navigate to the cart page
  await this.dashboardPage.navigateToCart();
});

// -------------------------------------------------------
// Step: Verify product is displayed in cart
Then("verify {string} is displayed in Cart", async function (productName) {
  // Get Cart Page object
  const cartPage = this.poManager.getCartPage();

  // Verify the product is in the cart
  await cartPage.VerifyProductIsDisplayed(productName);

  // Proceed to checkout
  await cartPage.Checkout();
});

// -------------------------------------------------------
// Step: Enter valid details to place order
When("enter valid details to place the order", async function () {
  // Get Order Review Page object
  const ordersReviewPage = this.poManager.getOrdersReviewPage();

  // Search country and select it
  await ordersReviewPage.searchCountryAndSelect("ind", "India");

  // Submit order and save orderId for verification later
  this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(this.orderId);
});

// -------------------------------------------------------
// Step: Verify order in order history
Then("verify order in present in the OrderHistory", async function () {
  // Navigate back to orders page
  await this.dashboardPage.navigateToOrders();

  // Get Orders History Page object
  const ordersHistoryPage = this.poManager.getOrdersHistoryPage();

  // Search for the order using saved orderId and verify it exists
  await ordersHistoryPage.searchOrderAndSelect(this.orderId);

  // Assertion: orderId should be present in order history
  expect(
    this.orderId.includes(await ordersHistoryPage.getOrderId())
  ).toBeTruthy();
});

// -------------------------------------------------------
// Step: Login to Ecommerce2 application (practice site)
Given(
  "a login to Ecommerce2 application with {string} and {string};",
  { timeout: 60 * 1000 }, // ⬅️ allow 60 seconds for slow login
  async function (username, password) {
    // Locate username and sign-in elements
    const userName = this.page.locator("#username");
    const signIn = this.page.locator("#signInBtn");

    // Go to practice login page
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());

    // Fill username and password
    await userName.fill(username);
    await this.page.locator('[name="password"]').fill(password);

    // Click sign in
    await signIn.click();
  }
);

// -------------------------------------------------------
// Step: Verify error message on login failure
Then("verify error message is displayed;", async function () {
  // Log error message text content
  console.log(await this.page.locator('[style*="block"]').textContent());

  // Assertion: error message should contain "Incorrect"
  await expect(this.page.locator("[style*='block']")).toContainText(
    "Incorrect"
  );
});
