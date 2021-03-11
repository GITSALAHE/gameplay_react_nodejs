module.exports = app => {

    const Router = require("express").Router();
    const middleWareAdmin = require("../middleware/authenticateadmin")
    const categoryController = require("../controllers/category.controller")
    
    Router.route("/add").post(middleWareAdmin.admin, categoryController.add);
    Router.route("/update/:idCategory").put(middleWareAdmin.admin, categoryController.update);
    Router.route("/delete/:idCategory").delete(middleWareAdmin.admin, categoryController.delete);
    Router.route("/:idCategory").get(middleWareAdmin.admin, categoryController.getById);
    Router.route("/").get(middleWareAdmin.admin, categoryController.getAll)

    app.use("/category", Router)
}
