const { test, expect } = require("@playwright/test");

test.only("browser context test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  //   page.route("**/*{jpg,png,jpeg}",route=>route.abort())
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const cardTitle = page.locator(".card-body a");
  page.route("request", (request) => console.log(request.url()));
  page.route("response", (response) => console.log(response.url()));
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());

  await userName.fill("rahulshetty");
  await page.locator('[name="password"]').fill("learning");
  await signIn.click();

  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await signIn.click();
  console.log(await cardTitle.first().textContent());
  console.log(await cardTitle.nth(2).textContent());
  const allTitles = await cardTitle.allTextContents();
  console.log(allTitles);
});

test("UI controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const documentLink = page.locator("[href*='documents-request']");
  const dropDown = page.locator("select.form-control ");
  dropDown.selectOption("consult");
  await page.locator(".radiotextsty").last().click();
  await page.locator(".btn.btn-success").click();
  // await page.locator("#okayBtn").click()
  console.log(await page.locator(".radiotextsty").last().isChecked());
  await expect(page.locator(".radiotextsty").last()).toBeChecked();
  await page.locator("input#terms").click();
  await expect(page.locator("input#terms")).toBeChecked();
  await page.locator("input#terms").uncheck();
  expect(await page.locator("input#terms").isChecked()).toBeFalsy();

  await expect(documentLink).toHaveAttribute("class", "blinkingText");
});

test("@Child windows hadl", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*='documents-request']");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"), //listen for any new page pending,rejected,fulfilled
    documentLink.click(),
  ]); //new page is opened

  const text = await newPage.locator(".red").textContent();
  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ")[0];
  //console.log(domain);
  await page.locator("#username").fill(domain);
  console.log(await page.locator("#username").inputValue());
});
