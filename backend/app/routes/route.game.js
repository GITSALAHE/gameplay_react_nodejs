module.exports = app => {
    const Router = require("express").Router();
    const gameController = require("../controllers/game.controller");
    const middlewareUser = require("../middleware/authenticateUser");

    Router.route("/createround/:idCategory").get(middlewareUser.user, gameController.createRound);
    Router.route("/question/:q").get(middlewareUser.user, gameController.getQuestion);
    Router.route("/question/:q").post(middlewareUser.user, gameController.postQuestion);
    Router.route("/score").get(middlewareUser.user, gameController.getResults)
    Router.route("/deletGame").get(middlewareUser.user, gameController.exitGame);
    app.use("/games", Router)
}