const User = require("../models/model.user");
const Category = require("../models/model.category");
const Question = require("../models/model.question");
const Round = require("../models/model.round");
const nodemailer = require("nodemailer");


exports.createRound = (req, res) => {
    Round.findOne({ idUser: req.idUser }).then(async (response) => {
        if (response == null) {
            let category = req.params.idCategory;
            let questions;
            await Question.findRandom({ idCategory: category }, {}, { limit: 10 }, async function (err, results) {
                questions = {
                    ...results
                }
                let roundPush = new Round({
                    idUser: req.idUser,
                    idCategory: category,
                    question: questions
                })
                await roundPush.save().then(() => res.json({ notif: "round created !" }))
            })
        }
        else {
            res.json({ error: "You already created a game !" })
        }
    }).catch((err) => res.json(err))
}

exports.getQuestion = (req, res) => {
    let index = req.params.q;
    let indexDb = parseInt(index.substring(1)) - 1;
    Round.findOne({ idUser: req.idUser }).then((response) => {
        if (response == null) {
            res.json({ error: "round not found" })
        }
        else {
            if (response.question[indexDb].valid == true) {
                Array.prototype.move = function (from, to) {
                    this.splice(to, 0, this.splice(from, 1)[0]);
                };
                var answers = [response.question[indexDb].falseresponse[0], response.question[indexDb].falseresponse[1], response.question[indexDb].falseresponse[2], response.question[indexDb].contentResponse];
                answers.move(Math.floor(Math.random() * 3) + 1, Math.floor(Math.random() * 3) + 1);
                User.findOne({ _id: req.idUser }).then((user) => {
                    res.json({
                        your_score: user.score,
                        question: response.question[indexDb].contentQuestion,
                        answer1: answers[0],
                        answer2: answers[1],
                        answer3: answers[2],
                        answer4: answers[3]
                    })
                })

            }
            else {
                res.json({ error: "question is expired !" })
            }
        }
    })
}

exports.postQuestion = (req, res) => {
    let answer = req.body.answer;
    let index = req.params.q;
    let indexDb = parseInt(index.substring(1)) - 1;
    Round.findOne({ idUser: req.idUser }).then(async (response) => {
        if (response == null) {
            res.json({ error: "round not found" })
        }
        else {
            if (parseInt(index.substring(1)) + 1 > 11) {
                res.json({ error: "go to scoreboard !" })
                return;
            }
            if (response.question[indexDb].valid == true) {
                if (answer === response.question[indexDb].contentResponse) {
                    await User.updateOne({ _id: req.idUser }, { $inc: { score: response.question[indexDb].point } })
                    await Round.updateOne({ _id: response._id }, { ["question." + indexDb + ".valid"]: false }).then(() => {
                        if (parseInt(index) + 1 <= 10) {
                            res.json("true answer ! go to q" + (indexDb + 2))
                        }
                        else {
                            res.json("true answer ! go to the scoard board")
                        }
                    })
                }
                else {
                    await Round.updateOne({ _id: response._id }, { ["question." + indexDb + ".valid"]: false }).then(async () => {
                        if (parseInt(index) + 1 <= 10) {
                            res.json("false answer ! go to q" + (indexDb + 2))
                        }
                        else {
                            await User.findOne({ _id: req.idUser }).then(async (user) => {
                                if (user.score < 100 && response.attempt < 3) {
                                    await Round.update({ idUser: req.idUser }, { ["question." + indexDb + ".valid"]: true, $inc: { attempt: 1 } }).then(() => res.json("reset attempt number " + response.attempt))
                                }
                                else {
                                    res.json("false answer ! go to the scoard board")
                                }
                            })
                        }
                    })
                }
            }
            else {
                res.json({ error: "question is expired !" })
            }
        }
    })
}

exports.getResults = (req, res) => {
    Round.findOne({ idUser: req.idUser }).then((round) => {
        if (round == null) {
            res.json({ error: "unthorized !" })
        }
        else {
            User.findOne({ _id: req.idUser, ["question.14.valid"]: false }).then(async (response) => {
                if (response == null) {
                    res.json({ error: "unthorized !" })
                }
                else {

                    let transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        secure: true, // true for 465, false for other ports
                        auth: {
                            user: "gitshopllc@gmail.com", // generated ethereal user
                            pass: "0646274243", // generated ethereal password
                        },
                    })
                    // send mail with defined transport object
                    let info = await transporter.sendMail({
                        from: '"WHO WIN 1M ✈️" <gitshopllc@gmail.com>', // sender address
                        to: response.email, // list of receivers
                        subject: "Confirmation de COMPTE !", // Subject line
                        text: "Confirmed !", // plain text body
                        html: "Hi <b> " + response.name + " </b><br><p>This is your gift : FERRARI ! ", // html body
                    }).then(() => {
                        res.json({
                            your_score: response.score,
                            your_gift: 'Ferrari',
                            notification: "an email was sended to your mail"
                        })
                    })

                }

            })
        }
    })
}

exports.exitGame = async (req, res) => {
   await Round.findOne({idUser : req.idUser}).then(async (response) => {
        if(response == null){
            res.json({error : "unthorized !"})
        }
        else{
           await Round.deleteOne({idUser : req.idUser}).then(async () => await User.updateOne({_id : req.idUser}, {score : 0})).then(() => res.json("round deleted !"))
        }
    })
}