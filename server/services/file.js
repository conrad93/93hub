const fs = require('fs');
const path = require('path');

const formUpload = async function(file, name, formConfig) {
    try {
        let folderPath = path.join(__dirname, "..", "..", "..", "uploads", formConfig.path ? formConfig.path : '');
        if(!fs.existsSync(folderPath)){
            fs.mkdirSync(folderPath, {recursive: true});
        }
        let readFile = fs.readFileSync(file.filepath);
        fs.writeFile(folderPath + "/" + name, readFile, function(err){
            if(err){
                console.error(err);
                return {status:false, message: "Failed.", error:err};
            }
            return {status: true, message:"Success!"};
        });
    } catch (error) {
        console.error(error);
        return {status:false, message:error.message, error:error};
    }
}

module.exports = {
    formUpload: formUpload
};