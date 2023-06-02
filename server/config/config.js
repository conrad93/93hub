let environment = {
    development:{
        saltRounds: 10,
        JWT_expiresIn: '8h',
        host: "http://localhost:8000",
        folderPath: "/api/file/show/"
    },
    production:{
        saltRounds: 10,
        JWT_expiresIn: '8h',
        host: "",
        folderPath: "/api/file/show/"
    },
};

module.exports.get = function(env) {
    try{
        return environment[env];
    } catch(err) {
        console.log(err);
    }
}