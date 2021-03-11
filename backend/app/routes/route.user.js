module.exports = app => {
    const Router = require("express").Router();
    const userController = require("../controllers/user.controller")
    Router.route("/login").post( userController.login);
    Router.route("/register").post(userController.register);
    app.use("/user", Router)
}
