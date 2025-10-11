const {test, expect} = require('@playwright/test')

test('morevalidation and iframes',async({page})=>{
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
  // await page.goto('http://google.com')
  // await page.goBack()
  // await page.goForward()
  await expect(page.locator('.displayed-class')).toBeVisible();
  await page.locator('#hide-textbox').click()
  await expect(page.locator('.displayed-class')).toBeHidden();

  await page.locator('#show-textbox').click()
    // await page.pause()
  page.on('dialog',dialog=> dialog.accept())
  await page.locator('#confirmbtn').click()
  await page.locator("#mousehover").hover()
  const framePage = page.frameLocator("#courses-iframe")
  await framePage.locator("li a[href*='lifetime-access']:visible").click()
  const textCheck = await framePage.locator(".text h2").textContent()
  console.log(textCheck.split(' ')[1]);
})