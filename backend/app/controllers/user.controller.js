const User = require('../models/model.user')
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const config = require("../configs/jwt.config")

exports.register = (req, res) => {
    var matchEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/g
    let passwordBrut = req.body.password;
    let password = bcrypt.hashSync(passwordBrut, 10)
    let name = req.body.name
    let email = req.body.email
    var error = [];

    if (name === "") {
        error.push("full name is empty !")
    }
    else if (name < 5) {
        error.push("full name is too short !");
    }

    if (email == "") {
        error.push("email is empty")
    }
    else if (!email.match(matchEmail)) {
        error.push("email invalid")
    }
    if (passwordBrut === "") {
        error.push("password is empty")
    }
    else if (passwordBrut.length <= 3) {
        error.push("password is short")
    }
    if (error.length > 0) {
        res.json({ error: error })
    }
    else {
        let userPush = new User({
            name,
            email,
            password,
           
        })
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (user == null) {
                    userPush.save()
                        .then(() => res.json({notification : "please login now with your info" }))
                        .catch((err) => res.json(err))
                }
                else {
                    error.push("email already exist !")
                    res.json({ error: error});
                }
            })
            .catch((err) => res.json(err))
    }

}

exports.login = (req, res) => {
    let email = req.body.email;
    var matchEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/g
    var password = req.body.password;
    var error = [];

    if (email == "") {
        error.push("email is empty")
    }
    else if (!email.match(matchEmail)) {
        error.push("email invalid")
    }
    if (password === "") {
        error.push("password is empty")
    }
    else if (password.length <= 3) {
        error.push("password is short")
    }

    if (error.length > 0) {
        res.json({ error: error })
    }
    else {
        User.findOne({ email: email }).select('password').then((login) => {
            if (login == null) {
                error.push("email not found !")
                res.json({ error: error });
                return;
            }
            // @ts-ignore
            var passwordIsValid = bcrypt.compareSync(req.body.password, login.password);
            if (!passwordIsValid) {
                error.push("credential error !")
                return res.json({
                    error: error
                });
            }
            
            else {
                var token = jwt.sign({
                    id: login._id,
                    user : true
                }, config.secret, {
                    expiresIn: 86400
                })

                res.status(200).send({
                    auth: true,
                    token: token
                })
            }
        }).catch((err) => res.json(err))
    }
}