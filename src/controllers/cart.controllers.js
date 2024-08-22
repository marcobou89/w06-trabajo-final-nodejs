const catchError = require('../utils/catchError');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    const {id}=req.user

    const results = await Cart.findAll({include:[Product]},{where:{userId:id}});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const {id} = req.user
    
    
    // delete req.body.userId
    const newBody ={...req.body, userId: id}


    const result = await Cart.create(newBody);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Cart.findByPk(id,{include:[Product]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    
    const { id } = req.params;
    const result = await Cart.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204)
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    
     //evitar actualizar el campo userId
    delete req.body.userId
    
    const result = await Cart.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}