const TemplateService = require("../services/template");
const CusomerService = require("../services/customer");
const config = require("../config/config").get(process.env.NODE_ENV);

const getSite = async function(req,res) {
    let template = '';
    try {
        let data = null;
        let username = req.params.username;
        let customer = await CusomerService.getCustomer({username: username, status: 1}, {});
        if(customer.status && customer.data){
            if(customer.data.template_id){
                data = await TemplateService.findTemplate({_id: customer.data.template_id}, {template: 1, details: 1});
            } else {
                data = await TemplateService.findTemplate({code: 'default'}, {template: 1, details: 1});
            }
            if(data){
                template = TemplateService.getTemplate(data.template, {data: customer.data});
            } else {
                template = "Template not found.";
            }
        } else {
            template = "Username not found.";
        }
    } catch (error) {
        console.log(error);
        template = "Error.";
    }
    res.render('site', {
        data: template
    });
}

module.exports = {
    getSite: getSite
};