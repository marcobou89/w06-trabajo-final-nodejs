const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ProductImg = sequelize.define('product_images', {
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false
    }
    //productId
});

module.exports = ProductImg;