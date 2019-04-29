import chai from "chai";
import chaiHttp from "chai-http";
import chaiMatch from "chai-match";
const expect = chai.expect;
import app from "../app.js";
import {
  clearDBafterTest,
  clearDBafterTestProduct
} from "../helper/clearDB_forTesting";
import { Person, Product } from "../model";
import { jwtSigin, verifyJwt } from "../helper/jwt.js";

chai.use(chaiHttp);
chai.use(chaiMatch);

let [token, id, wrongTokenAsUser] = [null, null, null];

describe("PRODUCT TESTING", function() {
  before(function(done) {
    this.enableTimeouts(false);
    Person.create({
      username: "muhammad",
      email: "muhammad@email.com",
      password: "12345678",
      name: "Muhammad",
      gender: "Male",
      phone: "18012333",
      role: "admin"
    })
      .then(createdUser => {
        token = jwtSigin({ _id: createdUser._id, role: createdUser.role });
        wrongTokenAsUser = jwtSigin({ _id: createdUser._id, role: "user" });
      })
      .catch(err => {
        console.log(err);
      });
    clearDBafterTest(done);
  });

  after(function(done) {
    this.enableTimeouts(false);
    clearDBafterTest(done);
  });

  let obj = {
    productName: "Laptop",
    stock: 100
  };
  describe("POST --add_product by ADMIN", function() {
    it("tring to add product and succesfully with status code [ 201 ]", function(done) {
      chai
        .request(app)
        .post("/api/admin/addproduct")
        .set("token", token)
        .send(obj)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("productName");
          expect(res.body).to.have.property("stock");
          expect(res.body.productName).to.be.a("string");
          expect(res.body.stock).to.be.a("number");
          expect(res.body.stock).not.to.be.null;
          expect(res.body.stock).to.be.above(0);
          done();
        });
    });
  });

  describe(`POST --add_product if product added by USER`, () => {
    it("trying to add product by USER and unauthorized , because only admin allow to add [ 401 ]", async () => {
      const product = {
        productName: "Bak Sampah",
        stock: 5,
        category: "Home"
      };
      const userAdd = await chai
        .request(app)
        .post("/api/admin/addproduct")
        .set("token", wrongTokenAsUser)
        .send(product);

      expect(userAdd.statusType).to.equal(4);
      expect(userAdd.unauthorized).to.equal(true);
    });
  });

  describe("add product ERROR", () => {
    let inputwrong = {
      yep: "1222222ss2"
    };
    it("it gonna be error if error", async () => {
      const wrongInput = await chai
        .request(app)
        .post("/api/admin/addproduct")
        .set("token", token)
        .send(inputwrong);

      expect(wrongInput.statusType).to.equal(5);
      expect(wrongInput.body).to.have.property("error");
      expect(wrongInput.body).to.not.have.all.keys(
        "stock",
        "productName",
        "price"
      );
    });
  });

  describe("add product but no token", () => {
    let objproduct = {
      productName: "Laptop",
      stock: 100,
      category: "Computer"
    };

    it("should get error because not Authentic or NO TOKEN", async () => {
      const noToken = await chai.request(app).post("/api/admin/addproduct");

      expect(noToken.body).to.have.property("error");
      expect(noToken).to.have.status(400);
      expect(noToken.badRequest).to.equal(true);
    });
  });

  describe("GET get all product", () => {
    it(`should get all products`, async () => {
      let getProduct = await chai.request(app).get("/api/admin/listproducts");
      id = getProduct.body[0]._id;

      expect(getProduct).to.be.an("object");
      expect(getProduct).to.have.status(200);
    });
  });

  describe("DELETE one / all product", () => {
    it("should delete one product and SUCESS", async () => {
      let deleted = await chai
        .request(app)
        .delete("/api/admin/delete/" + id)
        .set("token", token);

      expect(deleted)
        .to.be.an("object")
        .to.have.status(201);
    });
  });

  describe("DELETE product but Failed", () => {
    it("GET ERROR onn delete Product ", async () => {
      let deleted = await chai
        .request(app)
        .delete("/api/admin/delete/" + id + 2)
        .set("token", token);

      expect(deleted)
        .to.be.an("object")
        .to.have.status(500);
    });
  });

  describe("DELETE one / all product but NO TOKEN", () => {
    it("NO TOKEN TO DELETE ", async () => {
      let deleted = await chai.request(app).delete("/api/admin/delete/" + id);

      expect(deleted)
        .to.be.an("object")
        .to.have.status(400);
      expect(deleted.badRequest).to.equal(
        true,
        "because you are not authentic :D"
      );
    });
  });

  describe("DELETE one / all product but TOKEN is wrong because not an ADMIN", () => {
    it("HAS TOKEN TO DELETE BUT  not an ADMIN ", async () => {
      let deleted = await chai
        .request(app)
        .delete("/api/admin/delete/" + id)
        .set("token", wrongTokenAsUser);

      expect(deleted)
        .to.be.an("object")
        .to.have.status(401);
      expect(deleted.unauthorized).to.equal(true);
    });
  });

  describe("PUT edit product", () => {
    it("should edit correctly", async () => {
      let editable = {
        stock: 9000
      };
      let update = await chai
        .request(app)
        .put("/api/admin/update/" + id)
        .set("token", token)
        .send(editable);
      expect(update).to.be.an("object");
      expect(update.statusType).to.equal(2);
    });
  });

  describe("PUT Edit product error", () => {
    it("edit Product got Error", async () => {
      let inputWrongs = {
        stock: "uiu98"
      };
      let update = await chai
        .request(app)
        .put("/api/admin/update/" + id)
        .set("token", token)
        .send(inputWrongs);

      expect(update.statusType).to.equal(5);
      expect(update.body).have.property("error");
    });
  });

  describe("PUT edit product but as user, not an Admin", () => {
    it("edit product but not as an Admin", async () => {
      let objUpdate = {
        stock: 300
      };
      let notAsAdmin = await chai
        .request(app)
        .put("/api/admin/update/" + id)
        .set("token", wrongTokenAsUser)
        .send(objUpdate);

      expect(notAsAdmin).to.have.status(401);
      expect(notAsAdmin.unauthorized).to.equal(true);
    });
  });
});
