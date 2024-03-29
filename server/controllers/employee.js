const bcrypt = require("bcrypt");
const EmployeeService = require("../services/employee");
const CommonService = require("../services/common");
const config = require("../config/config").get(process.env.NODE_ENV);

const signin = async function(req,res) {
    try {
        const {email, password} = req.body;
        if(!email && !password) {
            return res.status(400).send("Email and password required.");
        }
        const employee = await EmployeeService.getEmployee(
            {email: email, status: 1},
            {name: 1, email: 1, password: 1, status: 1}
        );
        if(employee.status && employee.data){
            let isValidPassword = bcrypt.compare(password, employee.data.password);
            if(isValidPassword) {
                let data = {
                    _id: employee.data._id,
                    email: employee.data.email,
                    name: employee.data.name,
                    status: employee.data.status
                };
                let token = CommonService.generateToken(data, config.JWT_expiresIn);
                EmployeeService.updateById(employee.data._id, {token: token});
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

const create = async function(req,res) {
    try {
        let data = req.body;
        if(data.password){
            data.password = await bcrypt.hash(data.password, config.saltRounds);
        }
        let response = await EmployeeService.create(data);
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
            let response = await EmployeeService.updateById(id, {password: password});
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
    let token = req.headers.e_token;
    if(token){
        try {
            let decoded = CommonService.verifyToken(token);
            let employee = await EmployeeService.getEmployee(
                {token: token},
                {name: 1, email: 1, token: 1}
            );
            res.status(200).send(employee);
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
    create: create,
    verify: verify,
    updatePassword: updatePassword
};