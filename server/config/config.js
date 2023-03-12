let environment = {
    development:{
        saltRounds: 10,
        JWT_expiresIn: '8h'
    },
    production:{
        saltRounds: 10,
        JWT_expiresIn: '8h'
    },
};

module.exports.get = function(env) {
    try{
        return environment[env];
    } catch(err) {
        console.log(err);
    }
}