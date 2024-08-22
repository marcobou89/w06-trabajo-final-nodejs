require('../models')

const sequelize = require('../utils/connection');
const userCreate = require('./createData/userCreate');

const testMigrate = async () => {

    try {
        await sequelize.sync({ force: true })
        console.log('DB reset ✅');
        // //pegar funcion que viene de createdata
        
        await userCreate()//introducir usuario
        process.exit()
    } catch (error) {
        console.error(error);
    }
}

testMigrate()