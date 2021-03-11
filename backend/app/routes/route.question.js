module.exports = app => {
    const Router = require("express").Router();
    const middlewareAdmin = require("../middleware/authenticateadmin");
    const controllerQuestion = require("../controllers/question.controller");

    Router.route("/").get(middlewareAdmin.admin, controllerQuestion.getAll);
    Router.route("/:idQuestion").get(middlewareAdmin.admin, controllerQuestion.getById)
    Router.route("/add").post(middlewareAdmin.admin, controllerQuestion.add);
    Router.route("/update/:idQuestion").put(middlewareAdmin.admin, controllerQuestion.update);
    Router.route("/delete/:idQuestion").delete(middlewareAdmin.admin, controllerQuestion.delete);

    app.use("/question", Router)
}
