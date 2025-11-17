Feature: Ecommerce validations
  @Regression

  Scenario: Placing the order successfully
    Given a login to Ecommerce application with "wrightadebayo80@gmail.com" and "Computer30"
    When Add "ZARA COAT 3" to the Cart
    Then verify "ZARA COAT 3" is displayed in Cart
    When enter valid details to place the order
    Then verify order in present in the OrderHistory

  @validation

  Scenario Outline: Placing the order successfully
    Given a login to Ecommerce2 application with "<username>" and "<password>";
    Then verify error message is displayed;

    Examples:
      | username                  | password   |
      | wrightadebayo80@gmail.com | Computer30 |
      | digitechmark20@gmail.com  | Computer30 |