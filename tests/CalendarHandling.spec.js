const { test, expect } = require('@playwright/test');

test('Calendar handling',async({page})=>{
  await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers')

  const monthNumber = '10';
  const date = '10';
  const year = '2025'
  await page.locator('.react-date-picker__inputGroup ').click()
  await page.locator('.react-calendar__navigation__label__labelText ').click()
await page.locator('.react-calendar__navigation__label__labelText ').click()
 await page.getByText(year).click()
  await page.locator('.react-calendar__tile ').nth(Number(monthNumber)-1).click()
  await page.locator(`//abbr[text()='${date}']`).click();


})