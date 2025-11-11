const base  = require("@playwright/test");

exports.customtest=base.test.extend(
  {
testDataForOrder : {
  username:"wrightadebayo80@gmail.com",
  password:"Computer30",
  productName : "ZARA COAT 3",
   
}

  }
)