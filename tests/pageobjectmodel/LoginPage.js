class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
    this.signInbutton = page.locator("[value='Login']");
  }
async goTo(page) {
    await page.goto("https://rahulshettyacademy.com/client");
  }

  async loginToApplication(username, password) {
    await this.username.pressSequentially(username, { delay: 150 });
    await this.password.pressSequentially(password, { delay: 150 });
    await this.signInbutton.click();
  }
}
module.exports = { LoginPage };
