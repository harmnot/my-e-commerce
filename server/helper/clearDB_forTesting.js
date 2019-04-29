import { Person, Product } from "../model/index.js";

const clearDBafterTest = done => {
  if (process.env.NODE_ENV === "test") {
    console.log(
      "clear before and after for testing NOTE: SOMETIMES BEFORE AND AFTER HOOK TESTING FAILED, BUT PLEASE TRY AGAIN IF HOOK FAILED, IF HOOK FAILED OTHER TESTING WILL NOT WORKING"
    );
    Person.deleteMany({})
      .then(() => {
        done();
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const clearDBafterTestProduct = done => {
  if (process.env.NODE_ENV === "test") {
    console.log(
      "clear before and after for testing NOTE: SOMETIMES BEFORE AND AFTER HOOK TESTING FAILED, BUT PLEASE TRY AGAIN IF HOOK FAILED, IF HOOK FAILED OTHER TESTING WILL NOT WORKING"
    );
    Product.deleteMany({})
      .then(() => {
        done();
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export { clearDBafterTest, clearDBafterTestProduct };
