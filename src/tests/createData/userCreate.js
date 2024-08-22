const User = require("../../models/User")

const userCreate=async()=>{

    const user ={
        firstName: 'test',
        lastName: 'test',
        email: 'a@a.com',
        password: '123456',
        phone: 123456789
    }
    



    await User.create(user)
}

module.exports = userCreate
