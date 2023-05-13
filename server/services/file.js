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

const show = async function(file, callback){
    try {
        let folderPath = path.join(__dirname, "..", "..", "..", "uploads", file);
        if(fs.existsSync(folderPath)){
            let rFile = await fsReadFile(folderPath); 
            return callback(rFile);
        } else {
            return callback({status: 404, contentType: "text/plain", data: "404 Not Found"});
        }
    } catch (error) {
        console.error(error);
        return callback({status: 500, contentType: "text/plain", data: "Error"});
    }
}

const getMimeType = function(filePath){
    const extension = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.csv': 'text/csv',
        '.pdf': 'application/pdf',
        '.svg': 'image/svg+xml',
        '.txt': 'text/plain'
    };
    return mimeTypes[extension] || 'application/octet-stream';
}

const fsReadFile = function(filePath){
    return new Promise((resolve,reject) => {
        fs.readFile(filePath, function(err, data){
            if(err){
                console.error(err);
                resolve({status: 500, contentType: "text/plain", data: "Error"});
            }
            let contentType = getMimeType(filePath);
            resolve({status: 200, contentType: contentType, data: data});
        });
    });
}

module.exports = {
    formUpload: formUpload,
    getMimeType: getMimeType,
    show: show,
    fsReadFile: fsReadFile
};