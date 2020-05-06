/** 
 * @purpose : Here upload image on aws 
 * @File : img-uploading.js
 * @author : DipakPatil
 * @version : 1.0
 * @since :
 */

const aws = require('aws-sdk');
const multer = require('multer')
const multerS3 = require('multer-s3');
const config=require('../configuration/dbconfig');
let conf = {
    AccessKeyID : config.accesskey,
    secretAccessKey : config.secretkey,
    region : 'ap-south-1',
};
const s3 = new aws.S3();
/**
* @description : filter image file by extension
* @param {* requested from frontend } req 
* @param {* requested from frontend } file 
* @param {* response to backend } callback 
*/

const fileFilter = function(req,file,callback){
if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
callback(null,true)
}
else{
callback(new Error("Invalid MIME type , only jpeg & png"),false)
}
}

/**
* @description : Passing images to aws Bucket using multer-s3.
*/
var upload = multer({
fileFilter,
storage : multerS3({
s3 : s3,
bucket : 'fundooappimg',
acl : 'public-read',
metadata : function(req,file,callback){
callback(null,
{fieldName : "Test Meta Data"})
},
key : function(req,file,callback){
callback(null,Date.now().toString())
}
})
})

module.exports = upload;