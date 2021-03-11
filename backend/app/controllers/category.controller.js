const Category = require('../models/model.category');
const winston = require('winston');

const logConfiguration = {
    'transports': [
        new winston.transports.File({
            filename: 'logs/logs.log'
        })
    ]
}

const logger = winston.createLogger(logConfiguration)

exports.add = async (req, res) => {
    const category = new Category({
        nomCategory : req.body.nomCategory
    });

   await category.save().then((cat) => {
    res.status(201).json(cat)
    var newDate = new Date();

    logger.info(newDate.toLocaleDateString()+' - '+newDate.toLocaleTimeString()+' - '+'Adding Category name :'+ req.body.nomCategory)
   }).catch((err) => res.status(500).json(err))
    
}

exports.update = async (req, res) => {
     await Category.updateOne({_id:req.params.idCategory}, {$set :{nomCategory :req.body.nomCategory}}).then(() => {
        res.status(200).json("updated ! ");
        var newDate = new Date()
        logger.info(newDate.toLocaleDateString()+' - '+newDate.toLocaleTimeString()+' - '+'Adding Category name :'+ req.body.nomCategory)
    }).catch((err) => res.status(500).json(err))
}

exports.delete = async (req, res) => {
    await Category.remove({_id:req.params.idCategory}).then((cat) => {
        res.status(200).json(cat)
    }).catch((err) => res.status(500).json(err))
}

exports.getById = async (req, res) => {
    await Category.findById(req.params.idCategory).then((cat) => {
        res.status(200).json(cat);
        var newDate = new Date();

        logger.info(newDate.toLocaleDateString()+' - '+newDate.toLocaleTimeString()+' - '+'Getting category where id :'+ req.params.idCategory)
    }).catch((err) => res.status(500).json(err))
}

exports.getAll = async (req, res) => {
    await Category.find().then((cat) => {
        res.status(200).json(cat);
        var newDate = new Date();
        logger.info(newDate.toLocaleDateString()+' - '+newDate.toLocaleTimeString()+' - '+'Getting all categorys')
    }).catch((err) => res.status(500).json(err))
}