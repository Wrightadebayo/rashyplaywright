const { test, expect } = require('@playwright/test');

test('client app login', async ({ page }) => {
  const productName = 'iphone 13 pro';
  const email = 'wrightadebayo80@gmail.com';

  await page.goto('https://rahulshettyacademy.com/client');

  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("Computer30");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState('networkidle');

  const products = page.locator('.card-body');
  const count = await products.count();

  for (let i = 0; i < count; ++i) {
    const title = await products.nth(i).locator('b').textContent();
    if (title.trim() === productName) {
      // add to cart
      await products.nth(i).locator('text= Add To Cart').click();
      break; // stop looping once found
    }
  }
 

  // move to cart after loop
  await page.locator("[routerLink*='cart']").click();
   await page.locator('div li').first().waitFor()
 const bool= await page.locator('h3:has-text("iphone 13 pro")').isVisible();
 expect(bool).toBeTruthy();
 await page.locator("text=Checkout").click()
 await page.locator('[placeholder*="Country"]').pressSequentially("ind",{delay:100});
 const dropDown = page.locator('.ta-results');
 await dropDown.waitFor();
 await dropDown.locator('button').count();
 const optionCount = await dropDown.locator('button').count();
 for(let i = 0; i < optionCount; ++i)
  {
 const text = await dropDown.locator('button').nth(i).textContent();
 if(text === " Indonesia"){
  await dropDown.locator("button").nth(i).click();
  break
 }
 }
await page.pause()

})
