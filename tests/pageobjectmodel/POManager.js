const { LoginPage } = require("./LoginPage");
const { DashboardPom } = require("./DashboardPom");
const { OrderPage } = require("./OrderPage");
const { OrdersReviewPage } = require("./OrdersReviewPage");
const { CartPage } = require("./CartPage");
class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPom(this.page);
    this.ordersHistoryPage = new OrderPage(this.page);
    this.ordersReviewPage = new OrdersReviewPage(this.page);
    this.cartPage = new CartPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getDashboardPage() {
    return this.dashboardPage;
  }
  getOrdersHistoryPage() {
    return this.ordersHistoryPage;
  }

  getOrdersReviewPage() {
    return this.ordersReviewPage;
  }
}
module