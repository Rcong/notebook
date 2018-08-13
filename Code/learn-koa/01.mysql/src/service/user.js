let md5 = require('md5');
let User = require('../model').user;

module.exports = {
    login: async ({name, password}) => {
        
        let user = await User.findOne({ where: {name} });

        if (user.password === md5(password)) {
            return user;
        }

    }
}