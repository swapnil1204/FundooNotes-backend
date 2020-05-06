/*********************************************************************************************************************
 * @purpose : Here we write user schemas and api
 * @File : usermodel.js
 * @author : DipakPatil
 * @version : 1.0
 * @since :
 ***********************************************************************************************************************/


var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var upload=require('../middleware/img-uploading');
//var schema=mongoose.Schema;

var userschema = new mongoose.Schema({
    //name: {
        firstname: String,
        lastname: String,
    //},
    username: String,
    email: String,
    password: String,
    phone_no: Number,
    address: { 
        street: String,  
        city: String, 
        state: String,
        zipcode: Number 
    },
    imgUrl:{
        type:String
    },
    isVerfied:{
        type:Boolean,
        default:false
    }

});

var user = mongoose.model('myuser', userschema);
function hash(password) {
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

class usermodel {

/**
 * @Description : here register the user
 */
    register(body, callback) {
        console.log("usermodel 1")
        user.findOne({ "email": body.email }, (err, data) => {
            console.log("usermodel 2")
            if (err) {
                console.log("Error in registration");
                return callback(err);
            }
            else if(data !== null){
                 console.log("This email is already available here");
                 var response = { "error": true, "message": "Email already exists ", "errorCode": 404 };
                 return callback(response);
             }
            else {
                

                var newUser = new user({
                    //name: {
                        firstname: body.firstName,
                        lastname: body.lastName,
                    //},

                    username: body.username,
                    email: body.email,
                    password: hash(body.password),
                    phone_no: body.number,
                    // address: {
                    //     street: body.address.street,
                    //     city: body.address.city,
                    //     state: body.address.state,
                    //     zipcode: body.address.zipcode
                        
                    // }
                })


                newUser.save((err, result) => {
                    if (err) {
                        console.log("error in save data");
                        return callback(err);
                    }
                    else {
                        console.log("successfully saved");
                        return callback(null, result);
                    }

                })
            }
        })

    }

/**
 * @Description : here , verified registered user
 */
    verification(data,callback){
        console.log("In model verification");
        user.findOne({'_id':data.id},{"isVerfied":true},(err,result)=>{
            if(err) {
                return callback(err);
            }
            else {
                return callback(null,result);
            }
        })

    }
    login(body,callback) {
        console.log("In a login model 1");
        console.log(body);
        user.findOne({"email":body.email},(err,data)=>{
            console.log("In a login model 2");
            console.log(data);
            if(err) {
                console.log("Error login");
                return callback(err);
            }
            // else if(!data.isVerfied){
            //     return callback(err);
            // }
            else if(data != null){
                console.log(1); 
                bcrypt.compare(body.password,data.password).then(function(res){
                    
                    if(res) {
                        console.log("Successfully Login");
                        return callback(null,data);
                    }
                    else if(err) {
                        console.log("error in login");
                        return callback(err);
                    }
                    else {
                        console.log("Password is wrong");
                        return callback(err)
                    }
            

                });    
            }
            else{
                console.log("Email and password are incorrect");
                return callback("Invalid User")
            }
        })
    }
/**
 * @Description : here , we perform forgot password api
 */

    forgotPassword(body,callback){
        console.log("In forgotpassword 1");
        console.log();
        user.findOne({"email": body.email},(err,res)=>{
            if(err) {
                console.log("error");
                return callback(err);
            }
            else{
                if(res!==undefined && body.email===res.email){
                    console.log("Forgot password");
                    return callback(null,res);
                }
                else {
                    return callback("Email is Wrong");
                }
            }
        })

    }

/**
 * @Description : here , perform resetpassword api
 */

    resetPassword(req,callback) {
        console.log("In a model resetpassword");

        let newPassword=bcrypt.hashSync(req.body.password,salt);
        user.updateOne({_id:req.decoded.payload.id},{password:newPassword},(err,res)=>{
            if(err) {
                console.log(err);
                return callback(err);
            }
            else if(res){
                console.log(res);
                console.log("Password Change successfully");
                return callback(null,res);

            }
            else {

                return callback("id does not match");
            }
        })
    }
/**
 * @Description  : Image Uploading Api
 */
    uploadImg(req,callback){
        console.log("Usermodel 1");
        const singleUpload = upload.single('profile')
       
        singleUpload(req,callback,(err,result)=>{
            
            if(err) {
                callback(err);
            }
            else {
                console.log(req.file.location);
                
                 user.updateOne({'_id':req.decoded._id},
                        {$set:{
                                'imgUrl':req.file.location
                            }},{upsert : true},(err,data)=>{
                                if(err) {
                                    console.log(err)
                                }
                                else{
                                    console.log(data)
                                }
                            })

                return callback(null,result)
            }

        })
    }

    



//usermodel.prototype.register=(body,callback)=>{

// console.log("usermodel 1")
// user.findOne({"email":body.email},(err,data)=>{
// console.log("usermodel 2")
//     if(err) {
//         console.log("Error in login");
//         return callback(err);
//     }
//     // else if(data>0){
//     //     console.log("This email is already available here");
//     //     return callback(null,response)
//     // }
//     else {
//         body.password=bcrypt.hash(body.password,10);

//         var newUser=new user({
//             name:{
//                 firstname:body.firstname,
//                 lastname:body.lastname
//             },

//             username: body.username,
//             email: body.email,
//             password: body.password,
//             phone_no:body.number,
//             address:{
//                 street:body.street,
//                 zipcode: body.zipcode,
//                 city:body.city,
//                 state:body.state
//             }
//         })


//         newUser.save((err,result)=>{
//             if(err) {
//                 console.log("error in save data");
//                 return callback(err);
//             }
//             else {
//                 console.log("successfully saved");
//                 return callback(null,result);
//             }

//         })
//     }
// })

//}
}

module.exports = new usermodel();
