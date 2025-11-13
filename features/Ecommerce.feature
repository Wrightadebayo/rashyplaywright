Feature: Ecommerce validations

  Scenario: Placing the order successfully
    Given a login to Ecommerce application with "wrightadebayo80@gmail.com" and "Computer30"
    When Add "ZARA COAT 3" to the Cart
    Then verify "ZARA COAT 3" is displayed in Cart
    When enter valid details to place the order
    Then verify order in present in the OrderHistory