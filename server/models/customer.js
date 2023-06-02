const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    username: {type: String, require: true, unique: true},
    first_name: {type: String},
    last_name: {type: String},
    password: {type: String, require: true},
    token: {type: String},
    status: {type: Number, default: 1},
    email: {type: String},
    isd: {type: String},
    phone_no: {type: String},
    address: {type: String},
    city: {type: String},
    country: {type: String},
    nationality: {type: String},
    dob: {type: String},
    template_id: {type: String},
    template_data: {type: Object},
    title: {type: String},
    facebook_link: {type: String},
    twitter_link: {type: String},
    github_link: {type: String},
    linkedin_link: {type: String},
    profile_pic: {type: String},
    about_me: {type: String},
    resume: {type: String},
    skills_array: {type: Array},
    education_array: {type: Array},
    experience_array: {type: Array},
}, {timestamps: true});

module.exports = mongoose.model("customer",customerSchema);