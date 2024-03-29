const CommonService = require("../services/common");

const verify = async function(req,res,next) {
    let token = req.headers.e_token || req.headers.c_token;
    if(token){
        try {
            let decoded = CommonService.verifyToken(token);
            req.user = decoded.data;
            next();
        } catch (error) {
            console.log(error);
            res.status(401).send({status:false, message:error.message, error:error});
        }
    } else {
        res.status(401).send({status:false, message:"Authorisation failed."});
    }
};

module.exports = {
    verify: verify
};