const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const formUpload = async function(file, name, folders) {
    try {
        let folderPath = path.join(__dirname, "..", "..", "..", "uploads", folders ? folders : '');
        if(!fs.existsSync(folderPath)){
            fs.mkdirSync(folderPath, {recursive: true});
        }
        let readFile = fs.readFileSync(file.filepath);
        let response = new Promise(resolve => {
            fs.writeFile(folderPath + "/" + name, readFile, function (err) {
                if (err) {
                    console.error(err);
                    resolve({ status: false, message: "Failed.", error: err });
                }
                resolve({ status: true, message: "Success!", name: name });
            });
        });
        return response;
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

const generateImage = async function(html = ""){
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 900 });
    await page.setContent(html);
    const imageBuffer = await page.screenshot({ type: 'png' });
    await browser.close();
    return imageBuffer;
}

const getPath = function(str){
    return path.join(__dirname, "..", "..", "..", "uploads", str);
}

const exists = function(path){
    return fs.existsSync(path);
}

const saveImageBuffer = function(str, name, imageBuffer){
    return new Promise((resolve,reject) => {
        let folderPath = path.join(__dirname, "..", "..", "..", "uploads", str);
        if(!fs.existsSync(folderPath)){
            fs.mkdirSync(folderPath, {recursive: true});
        }
        fs.writeFile(folderPath + "/" + name, imageBuffer, function(err){
            if(err){
                console.error(err);
                resolve( {status:false, message: "Failed.", error:err} );
            }
            resolve( {status: true, message:"Success!"} );
        });
    });
}

module.exports = {
    formUpload: formUpload,
    getMimeType: getMimeType,
    show: show,
    fsReadFile: fsReadFile,
    getPath: getPath,
    exists: exists,
    generateImage: generateImage,
    saveImageBuffer: saveImageBuffer
};