const { When, Then, Given } = require("@cucumber/cucumber");
const { POManager } = require("../../pageobjectmodel/POManager");
const { expect } = require("@playwright/test");

const playwright = require("playwright");

Given(
  "a login to Ecommerce application with {string} and {string}",
  { timeout: 100 * 1000 },
  async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    const browser = await playwright.chromium.launch({ headless: false });

    const context = await browser.newContext();
    const page = await context.newPage();
    this.poManager = new POManager(page);
    const products = page.locator(".card-body");
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
    // await page.waitForLoadState('networkidle');
  }
);

When("Add {string} to the Cart", async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  this.dashboardPage = this.poManager.getDashboardPage();
  await this.dashboardPage.searchProductAddCart(productName);
  await this.dashboardPage.navigateToCart();
});

Then("verify {string} is displayed in Cart", async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  const cartPage = this.poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(productName);
  await cartPage.Checkout();
});

When("enter valid details to place the order", async function () {
  // Write code here that turns the phrase above into concrete actions
  const ordersReviewPage = this.poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(this.orderId);
});

Then("verify order in present in the OrderHistory", async function () {
  // Write code here that turns the phrase above into concrete actions
  await this.dashboardPage.navigateToOrders();
  const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(this.orderId);
  expect(
    this.orderId.includes(await ordersHistoryPage.getOrderId())
  ).toBeTruthy();
});
