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
import { comparePassword } from "../helper/hashing.js";

chai.use(chaiHttp);

describe("CLIENT SIDE", () => {
  before(function(done) {
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
        console.log("before hook");
      })
      .catch(err => {
        console.log(err);
      });
    clearDBafterTest(done);
  });

  after(function(done) {
    clearDBafterTest(done);
  });
  describe("POST REGISTER SUCESS for new user", () => {
    const newuser = {
      username: "giu",
      email: "my@email.com",
      password: "12345678",
      name: "rido",
      gender: "Male",
      address: "Jl. Tanah Kusir 2",
      phone: "123456789",
      role: "admin"
    };

    it(" should sucess to register", async () => {
      const tryingRegister = await chai
        .request(app)
        .post("/api/user/register")
        .send(newuser);
      expect(tryingRegister.statusType).to.equal(2);
      expect(tryingRegister.body.data).to.have.property("username");
      expect(tryingRegister.body.data).to.have.property("email");
      expect(tryingRegister.body.data).to.have.property("password");
      expect(tryingRegister.body.data).to.have.property("name");
      expect(tryingRegister.body.data).to.have.property("address");
      expect(tryingRegister.body.data.username).not.to.be.null;
      expect(tryingRegister.body.data.email).not.to.be.null;
      expect(tryingRegister.body.data.email).to.match(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      );
      expect(tryingRegister.body.data.password).not.to.be.null;
      expect(tryingRegister.body.data.name).not.to.be.null;
      expect(tryingRegister.body.data.username).to.match(/^[a-zA-Z0-9]+$/);
    });
  });

  describe("POST Register Failed", () => {
    it("REGISTER Gonna Failed for this Test for Duplicate ", async () => {
      const wrongUser = {
        username: "muhammad",
        email: "muhammad@email.com",
        password: "12345678",
        name: "rido",
        gender: "Male",
        address: "Jl. Tanah Kusir 2",
        phone: "123456789",
        role: "admin"
      };
      const goRegister = await chai
        .request(app)
        .post("/api/user/register")
        .send(wrongUser);

      expect(goRegister.statusType).to.equal(4);
      expect(goRegister.forbidden).to.equal(true);
    });

    it("Register failed another error", async () => {
      const wrongUser2 = {
        username: "#####2@@@",
        email: "muhammadww11@email.com",
        password: "12345678",
        name: "rido###o",
        gender: "Male",
        address: "Jl. Tanah Kusir 2",
        phone: "123456789",
        role: "admin"
      };
      const goRegister = await chai
        .request(app)
        .post("/api/user/register")
        .send(wrongUser2);
      expect(goRegister.body.data.username).to.not.match(/^[a-zA-Z0-9]+$/);
      expect(goRegister.body.data.name).to.not.match(/^[a-zA-Z0-9]+$/);
    });
  });

  describe("LOGIN for client", () => {
    it("login must be success", async () => {
      const login = {
        input: "muhammad",
        password: "12345678"
      };
      const theyLogin = await chai
        .request(app)
        .post("/api/user/login")
        .send(login);
      expect(theyLogin.statusType).to.equal(2);
      expect(theyLogin.body).to.all.have.keys("msg", "token");
    });

    it("failed login here", async () => {
      const fakeLogin = {
        input: "muha",
        password: "1234567"
      };
      const errorLogin = await chai
        .request(app)
        .post("/api/user/login")
        .send(fakeLogin);
      expect(errorLogin.clientError).to.equal(true);
      expect(errorLogin.statusType).to.equal(4);
    });
  });
});
