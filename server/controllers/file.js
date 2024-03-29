const FileService = require("../services/file");
const BaseService = require("../services/base");
const config = require("../config/config").get(process.env.NODE_ENV);
const formidable = require("formidable");

const form = async function(req,res) {
    try {
        let model = req.params.model;
        let form = new formidable.IncomingForm();
        form.parse(req, async function(err, fields, files){
            if(err){
                console.error(err);
                res.status(500).send({status:false, message:"Form parse error."});
                return;
            }
            if(files && Object.keys(files).length){
                let formConfig = fields.config ? JSON.parse(fields.config) : {};
                let folderPath = formConfig.path ? "/" + formConfig.path + "/" : "/";
                Object.keys(files).forEach(key => {
                    let extension = files[key].originalFilename.substring(files[key].originalFilename.lastIndexOf("."));
                    fields[key] = files[key].newFilename + extension;
                    FileService.formUpload(files[key], fields[key], formConfig.path);
                    fields[key] = folderPath + fields[key];
                });
            }
            let response;
            if(fields && Object.keys(fields).length){
                let data = {
                    "model": model
                };
                if(fields._id){
                    data["body"] = {};
                    Object.keys(fields).forEach(key => {
                        if(key !== '_id' && key !== 'config'){
                            data["body"][key] = fields[key];
                        }
                    });
                    response = await BaseService.updateById(fields._id, data);
                } else {
                    data["body"] = fields;
                    response = await BaseService.create(data);
                }
            }
            res.status(200).send(response);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({status:false, message:error.message, error:error});
    }
}

const show = async function(req,res) {
    try {
        let file = req?.params?.[0];
        FileService.show(file, function(response){
            res.writeHead(response.status , {
                "Content-Type": response.contentType
            });
            res.end(response.data);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({status:false, message:error.message, error:error});
    }
}

const upload = async function(req,res) {
    try {
        let form = new formidable.IncomingForm();
        form.parse(req, async function(err, fields, files){
            if(err){
                console.error(err);
                res.status(500).send({status:false, message:"Form parse error."});
                return;
            }
            let response;
            if(files && Object.keys(files).length){
                let extension = files['_file'].originalFilename.substring(files['_file'].originalFilename.lastIndexOf("."));
                fields['name'] = fields['name'] + extension;
                response = await FileService.formUpload(files['_file'], fields['name'], fields['folders']);
            }
            res.status(200).send(response);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({status:false, message:error.message, error:error});
    }
}

module.exports = {
    form: form,
    show: show,
    upload: upload
};