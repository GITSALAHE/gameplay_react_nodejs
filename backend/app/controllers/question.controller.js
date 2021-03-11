const Question = require('../models/model.question');


exports.add = async (req, res) => {
    const question = new Question({
        contentQuestion :req.body.contentQuestion,
        contentResponse : req.body.trueanswer,
        falseresponse : [
            req.body.falseresponse1,
            req.body.falseresponse2,
            req.body.falseresponse3
        ],
                idCategory:req.body.idCategory
    });
    await question.save().then((question) => {
        res.status(201).json(question)
    }).catch((err) => {
        res.status(500).json(err)
    })  
}

exports.update = async (req, res) => {
    await Question.updateOne({
        _id:req.params.idQuestion}, {$set :{
            contentQuestion :req.body.contentQuestion,
            contentResponse : req.body.contentResponse,
            falseresponse : [
                req.body.falseresponse1,
                req.body.falseresponse2,
                req.body.falseresponse3
            ],
            idCategory:req.body.idCategory
        }
    }).then(() => {
        res.status(204).json("question updated");
    }).catch((err) => res.status(500).json(err))
}

exports.delete = (req, res) => {

}

exports.getById = async (req, res) => {
    await Question.findById(req.params.idQuestion).then((question) => {
        res.status(200).json(question);
    }).catch((err) => {
        res.status(500).json(err)
    })
}

exports.getAll = async (req, res) => {
    await Question.find().then((question) => {
        res.status(200).json(question);
    }).catch((err) => {
        res.status(500).json(err)
    })
}