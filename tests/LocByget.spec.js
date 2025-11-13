const { test, expect } = require("@playwright/test");

test("Playwright Special locators", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");
  await page
    .getByPlaceholder("Password")
    .pressSequentially("abc123", { delay: 150 });
  await page.getByRole("button", { name: "Submit" }).click();
  await page
    .getByText("Success! The Form has been submitted successfully!.")
    .isVisible();
  await page.getByRole("link", { name: "Shop" }).click();
  //chaining
  await page
    .locator("app-card")
    .filter({ hasText: "Nokia Edge" })
    .getByRole("button")
    .click();

  //locator(css)
});

test("@web Getlocators ", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/locatorspractice/ ");
  await page
    .getByPlaceholder("Username")
    .pressSequentially("wrightadebayo80@gmail.com", { delay: 150 });
  await page
    .getByPlaceholder("Password")
    .pressSequentially("Computer30", { delay: 150 });
  await page.getByLabel("Remember my username").check();
  await page.getByText("I agree to the terms and privacy policy").check();
  //await page.getByLabel("Gender").selectOption('female')
  await page.locator("[type='submit']").click();
});
