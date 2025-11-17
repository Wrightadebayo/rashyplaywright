Feature: Ecommerce2 validations
  @validation

  Scenario Outline: Placing the order successfully
    Given a login to Ecommerce2 application with "<username>" and "<password>";
    Then verify error message is displayed;

    Examples:
    | username                    |  password   |
    | wrightadebayo80@gmail.com   |  Computer30 |
    | digitechmark20@gmail.com    |  Computer30 |