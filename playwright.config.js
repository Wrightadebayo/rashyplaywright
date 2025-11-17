// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration
 */
export default defineConfig({
  testDir: './tests',       // Folder with all your test files
  timeout: 40 * 1000,        // Test timeout 40s
  retries: 1,                // Retry failed tests once
  fullyParallel: true,       // Run multiple test files in parallel
  workers: 5,                // Number of concurrent workers (adjust to your CPU)

  expect: {
    timeout: 5000,
  },

  // Reporters for console output + Allure + HTML report
  reporter: [
    ['line'],
    ['allure-playwright'],
    ['html']
  ],

  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    ignoreHTTPSErrors: true,
    trace: 'on',
  },

  // Optional: Run tests on multiple projects/devices
  // projects: [
  //   {
  //     name: 'Desktop Chrome',
  //     use: { ...devices['Desktop Chrome'], headless: false },
  //   },
  //   {
  //     name: 'iPhone 11',
  //     use: { ...devices['iPhone 11'], headless: false },
  //   },
  // ],
});
