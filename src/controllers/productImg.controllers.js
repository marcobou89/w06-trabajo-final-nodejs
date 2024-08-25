const catchError = require('../utils/catchError');
const ProductImg = require('../models/ProductImg');
const Product = require('../models/Product');

const getAll = catchError(async(req, res) => {
    
    const results = await ProductImg.findAll({include:[Product]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    
    const {id} = req.user
    const newBody ={...req.body, userId: id}
    const result = await Cart.create(newBody);
    return res.status(201).json(result);

});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await ProductImg.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204)
});



module.exports = {
    getAll,
    create,
    remove,
    
}