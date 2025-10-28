const { test, expect } = require("@playwright/test");

test("Calendar handling", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

  const monthNumber = "10";
  const date = "8";
  const year = "2025";
  const ExpectedList = [monthNumber, date, year];

  // Open the date picker
  await page.locator(".react-date-picker__inputGroup").click();

  // Navigate to year selection (click twice to go from month → year)
  await page.locator(".react-calendar__navigation__label__labelText").click();
  await page.locator(".react-calendar__navigation__label__labelText").click();

  // Select year
  await page.getByText(year).click();

  // Select month (index starts at 0, so subtract 1)
  await page
    .locator(".react-calendar__tile")
    .nth(Number(monthNumber) - 1)
    .click();

  // Select date
  await page.locator(`//abbr[text()='${date}']`).click();

  // Verify that all three input fields contain the expected text values
  const inputs = page.locator(".react-date-picker__inputGroup input");

  for (let i = 0; i < ExpectedList.length; i++) {
    const value = await inputs.nth(i).inputValue();
    expect(value).toEqual(ExpectedList[i]);
  }
});
