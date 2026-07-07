const { Router } = require("express");
const authRouter = Router();
const  authController  = require("../controllers/authcontroller")

authRouter.get("/sign-up", authController.getSignUp);
authRouter.post("/sign-up", authController.postSignUp);
authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);
module.exports = authRouter;
console.log(authController);