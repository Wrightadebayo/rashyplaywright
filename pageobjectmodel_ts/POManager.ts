import { LoginPage } from "./LoginPage";
import { DashboardPom } from "./DashboardPom";
import { Page } from "playwright";
import { OrderPage } from "./OrderPage";
import { OrdersReviewPage } from "./OrdersReviewPage";
import { CartPage } from "./CartPage";

export class POManager {
  loginPage: LoginPage;
  dashboardPage: DashboardPom;
  ordersHistoryPage: OrderPage;
  ordersReviewPage: OrdersReviewPage;
  cartPage: CartPage;
  page: Page;

  constructor(page: Page) {
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
module.exports = { POManager };
