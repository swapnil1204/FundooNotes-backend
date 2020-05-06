/*********************************************************************************************************************
 * @purpose : Here we write all our user services
 * @File : userservice.js
 * @author : DipakPatil
 * @version : 1.0
 * @since : 
 ***********************************************************************************************************************/


var usermodel=require("../model/usermodel");

exports.register=(data,callback)=>{
    console.log("userservice 1",data);
    try{
    usermodel.register(data,(err,result)=>{
        console.log("userservice 2");
        if(err){
            return callback(err)
        }
        else {
            return callback(null,result);
        }
    });
}catch(err){console.log(err);
    callback.send(err)
}
}

exports.verification=(data,callback)=>{
    console.log("userservice verification 1");
    
    usermodel.verification(data,(err,data)=>{
        console.log("userservice verification 2");
        if(err) {
            return callback(err);
        }
        else {
            return callback(null,data);
        }
    })
}
exports.login=(data,callback)=>{
    console.log("userservice login 1");
    usermodel.login(data,(err,result)=>{
        console.log("userservid login 2");
        if(err){
            return callback(err);
        }
        else {
            return callback(null,result);
        }
    })
}

exports.forgotPassword=(data,callback)=>{
    console.log("userservices forgotPassword 1");
    usermodel.forgotPassword(data,(err,data)=>{
        console.log("Userservice Login 2");
        if(err) {
            return callback(err);
        }
        else {
            return callback(null,data);
        }
    })
}

exports.resetPassword=(data,callback)=>{
    console.log("userservices resetPassword 1");
    usermodel.resetPassword(data,(err,data)=>{
        console.log("Userservice resetpassword 2");
        if(err){
            return callback(err);
        }
        else {
            return callback(null,data);
        }
    })
}

exports.uploadServices=(req,callback)=>{
    
    usermodel.uploadImg(req,(err,data)=>{
        console.log("userservice 2");
        if(err) {
            return callback(err);
        }
        else {
            return callback(null, data);
        }
    })
}