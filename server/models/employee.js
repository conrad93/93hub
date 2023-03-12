const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    token: {type: String},
    status: {type: Number, default: 0}
}, {timestamps: true});

module.exports = mongoose.model("employee",employeeSchema);