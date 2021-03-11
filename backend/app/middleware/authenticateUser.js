const config = require("../configs/jwt.config")
let jwt = require('jsonwebtoken');

exports.user = (req, res, next) => {
    var token = req.headers['x-access-token'];
    if (!token)
        return res.send({
            auth: false,
            message: 'token please ...'
        });

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err)
            return res.send({
                auth: false,
                message: 'false token'
            });
            if(decoded.user == false || decoded.user == undefined){
                return res.send({
                    auth: false,
                    message: 'not authorized ...'
                });
            }
            else{
                req.idUser = decoded.id
                next();
            }
    })
}