module.exports = app => {
    const Router = require("express").Router();
    const conntrollerAdmin = require("../controllers/admin.controller");

    Router.route("/login").post(conntrollerAdmin.loginAdmin);

    app.use("/admin", Router);
}
