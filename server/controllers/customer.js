const bcrypt = require("bcrypt");
const CustomerService = require("../services/customer");
const CommonService = require("../services/common");
const config = require("../config/config").get(process.env.NODE_ENV);

const signin = async function(req,res) {
    try {
        const {username, password} = req.body;
        if(!username && !password) {
            return res.status(400).send("Username and password required.");
        }
        const customer = await CustomerService.getCustomer(
            {username: username, status: 1}, 
            {username: 1, first_name: 1, last_name: 1, password: 1, email: 1}
        );
        if(customer.status && customer.data){
            let isValidPassword = bcrypt.compare(password, customer.data.password);
            if(isValidPassword) {
                delete customer.data.password;
                let data = {...customer.data};
                let token = CommonService.generateToken(data, config.JWT_expiresIn);
                CustomerService.updateById(customer.data._id, {token: token});
                data["token"] = token;
                res.status(200).send({status:true, message:"Success!", data: data});
            } else {
                res.status(200).send({status:false, message:"Incorrect password."});
            }
        } else {
            res.status(200).send({status:false, message:"Email does not exist."});
        }
      } catch (error) {
        console.log(error);
        res.status(500).send({status:false, message:error.message, error:error});
    }
};

const signup = async function(req,res) {
    try {
        let data = req.body;
        if(data.password){
            data.password = await bcrypt.hash(data.password, config.saltRounds);
        }
        let response = await CustomerService.create(data);
        res.status(200).send(response);
      } catch (error) {
        console.log(error);
        res.status(500).send({status:false, message:error.message, error:error});
    }
};

const update = async function(req,res) {
    try {
        let data = req.body;
        let id = req.params.id;
        let response = await CustomerService.updateById(id, data);
        res.status(200).send(response);
      } catch (error) {
        console.log(error);
        res.status(500).send({status:false, message:error.message, error:error});
    }
};

const updatePassword = async function(req,res) {
    try {
        let password = req.body.password;
        let id = req.body.id;
        if(password && id){
            password = await bcrypt.hash(password, config.saltRounds);
            let response = await CustomerService.updateById(id, {password: password});
            res.status(200).send(response);
        } else {
            res.status(500).send({status:false, message: "Invalid request."});
        }
      } catch (error) {
        console.log(error);
        res.status(500).send({status:false, message:error.message, error:error});
    }
};

const verify = async function(req,res) {
    let token = req.headers.c_token;
    if(token){
        try {
            let decoded = CommonService.verifyToken(token);
            let customer = await CustomerService.getCustomer(
                {token: token},
                {username: 1, first_name: 1, last_name: 1, email: 1, token: 1}
            );
            res.status(200).send(customer);
        } catch (error) {
            console.log(error);
            res.status(500).send({status:false, message:error.message, error:error});
        }
    } else {
        res.status(401).send({status:false, message:"Authorisation failed."});
    }
};

module.exports = {
    signin: signin,
    signup: signup,
    verify: verify,
    update: update,
    updatePassword: updatePassword
};