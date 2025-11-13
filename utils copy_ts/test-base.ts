
import {test as baseTest} from '@playwright/test';


interface TestDataForOrder{
  username:string;
  password:string;
  productName:string;
}

export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>(
  {
testDataForOrder : {
  username:"wrightadebayo80@gmail.com",
  password:"Computer30",
  productName : "ZARA COAT 3",
   
}

  }
)