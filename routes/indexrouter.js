console.log("Index router loaded");
const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexcontroller")
indexRouter.get("/message", indexController.buildMsg);
indexRouter.post("/message", indexController.postMsg);
indexRouter.get("/home", indexController.switchHome);

module.exports = indexRouter;   