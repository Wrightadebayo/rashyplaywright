const { test, expect } = require("@playwright/test");

test("popups and iframes", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  // await page.goto('http://google.com')
  // await page.goBack()
  // await page.goForward()
  await expect(page.locator(".displayed-class")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator(".displayed-class")).toBeHidden();

  await page.locator("#show-textbox").click();
  // await page.pause()
  page.on("dialog", (dialog) => dialog.accept());
  await page.locator("#confirmbtn").click();
  await page.locator("#mousehover").hover();
  const framePage = page.frameLocator("#courses-iframe");
  await framePage.locator("li a[href*='lifetime-access']:visible").click();
  const textCheck = await framePage.locator(".text h2").textContent();
  console.log(textCheck.split(" ")[1]);
});

test("Morevalidation and iframes", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  // await page.goto('http://google.com')
  // await page.goBack()
  // await page.goForward()
  await expect(page.locator(".displayed-class")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator(".displayed-class")).toBeHidden();

  await page.locator("#show-textbox").click();
  // await page.pause()
  page.on("dialog", (dialog) => dialog.accept());
  await page.locator("#confirmbtn").click();
  await page.locator("#mousehover").hover();
  const framePage = page.frameLocator("#courses-iframe");
  await framePage.locator("li a[href*='lifetime-access']:visible").click();
  const textCheck = await framePage.locator(".text h2").textContent();
  console.log(textCheck.split(" ")[1]);
});

test("Screenshot and visual comparison", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  await expect(page.locator(".displayed-class")).toBeVisible();
  await page.locator(".displayed-class").screenshot({ path: "element.png" });
  // await page.screenshot({path:'screenshot.png'})
  await page.locator("#hide-textbox").click();
});

test.only("visual comparison", async ({ page }) => {
  //await page.goto('http://www.flightware.com')
  await page.goto("http://www.google.com");
  await page.screenshot({ path: "landingpage.png" });

  // Step 4: Compare current page screenshot with baseline (expected) image
  expect(await page.screenshot()).toMatchSnapshot("expected-page.png");
});
