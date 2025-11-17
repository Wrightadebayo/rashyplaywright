// Import POManager (your Page Object Manager) and Cucumber hooks
const { POManager } = require("../../pageobjectmodel/POManager");

// Import Cucumber hooks and Status constants
const { Before, After, AfterStep, BeforeStep, Status } = require("@cucumber/cucumber");

// Import Playwright to control the browser
const playwright = require("playwright");

// -------------------------------------------------------
// Before hook that runs **only for scenarios tagged @validation**
// This runs **before the first step of the scenario**
Before(async function () { 
  // Launch a Chromium browser (headless: false → visible browser)
   const browser = await playwright.chromium.launch({ headless: false });

  // Create a new browser context (isolated session)
  const context = await browser.newContext();

  // Create a new page in that context and save it to 'this'
  // so all steps can use 'this.page'
  this.page = await context.newPage();

  // Create a Page Object Manager instance to access page objects
  this.poManager = new POManager(this.page);  // shared across steps
});

// -------------------------------------------------------
// BeforeStep hook: runs **before every step** of any scenario
BeforeStep(async function () {
  // You could add logging or setup before each step here
});

// -------------------------------------------------------
// AfterStep hook: runs **after every step**
AfterStep(async function ({ result }) {
  // Check if the step failed
  if (result.status === Status.FAILED) {
    // Take a screenshot if the step failed
    await this.page.screenshot({ path: 'screenshot.png' });
  }
});

// -------------------------------------------------------
// After hook: runs **after the scenario is completed**
After(async function () {
  // Close the browser (currently commented out)
  // await this.browser.close();  

  // Log that the test has completed
  console.log("test completed");
});
