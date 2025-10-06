const { Router }= require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", indexController.indexGet);
indexRouter.get("/materials", indexController.materialsGet);
// usersRouter.get("/create", usersController.usersCreateGet);
// usersRouter.post("/create", usersController.usersCreatePost);
// usersRouter.get("/:id/update", usersController.usersUpdateGet);
// usersRouter.post("/:id/update", usersController.usersUpdatePost);
// usersRouter.post("/:id/delete", usersController.usersDeletePost);


module.exports = indexRouter;