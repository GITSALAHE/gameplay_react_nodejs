const Admin = require('../models/model.admin');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require("../configs/jwt.config")


exports.loginAdmin = (req, res) => {
    var error = [];
    var email  = req.body.email;
    var password = req.body.password;
    var matchEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/g

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
        Admin.findOne({
            email: req.body.email
        }).select('password').then((admin) => {
            if (admin == null) {
                error.push("email not found !")
                res.json({ error: error });
                return;
            }
            var passwordIsValid = bcrypt.compareSync(req.body.password, admin.password);
            if (!passwordIsValid){
                error.push("credential error !")
                return res.json({
                    error: error
                });
            }
            else{
                var token = jwt.sign({
                    id: admin._id,
                    admin: true,
                }, config.secret, {
                    expiresIn: 86400
                })
                res.status(200).send({
                    auth: true,
                    token: token
                })
            }
        
        }).catch((err) => {
            if (err) return res.status(500).send('Error server.')
        });
    }
   
}