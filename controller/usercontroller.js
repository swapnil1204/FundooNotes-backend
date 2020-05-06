/*********************************************************************************************************************
 * @purpose : Here write all user controllers
 * @File : usercontroller.js
 * @author : DipakPatil
 * @version : 1.0
 * @since :
 ***********************************************************************************************************************/
var userservice=require('../services/userservices');
var config=require('../configuration/dbconfig');
var jwt=require('jsonwebtoken');
var token=require('../middleware/token')
var nodemailer=require('../middleware/mail');
var upload=require('../middleware/img-uploading');
exports.register=(req,res)=> {
    console.log("controller1",req.body);
    
    // req.checkBody('name.firstname', 'Firstname is not valid').isLength({ min: 3 }).isAlpha();
    // req.checkBody('name.lastname', 'Lastname is not valid').isLength({ min: 3 }).isAlpha();
    // req.checkBody('username', 'Username is not valid').isLength({ min: 3 })
    // req.checkBody('email', 'Email is not valid').isEmail();
    // req.checkBody('password', 'password is not valid').isLength({ min: 8 });
    // req.checkBody('phone_no','Number is not valid').isLength({min:10,max:10});
    // req.checkBody('address.street', 'Street is not valid').isLength({ min: 3 })
    // req.checkBody('address.city','City is not valid ').not().isEmpty();


    //var errors = req.validationErrors();
    responseresult={};
    var errors = false; //just to run if block

    if(errors) {
        responseresult.sucess=false;
        responseresult.message=errors;
        res.status(400).send(responseresult)
    }
    else {
    userservice.register(req.body,(err,data)=>{
        console.log("control2",req.body);
        if(err) {
            responseresult.success=false;
            responseresult.error=err;
            return res.status(400).send(responseresult);
        }
        else {
            responseresult.success=true;
            responseresult.result=data;
            var payload={
                id: req.body._id
            }
            var obj=token.generateToken(payload);
            console.log(obj);
            const url=`http://localhost:8000/#!/verification/:${obj.token}`;
            console.log(url,req.body.email);
            nodemailer.sendmail(url,req.body.email);

            return res.status(200).send(url);

            }
        })
    }
}

exports.verification=(req,res)=>{
    var responseresult={}
    var obj={
        id:req.decoded.payload.id
    }
    userservice.verification(obj,(err,data)=>{
        if(err){
            responseresult.success=false;
            responseresult.error=err;
            res.status(400).send(responseresult);
        }
        else {
            responseresult.success=true;
            responseresult.result=data;
            res.status(200).send(responseresult);
        }
    })
}

exports.login=(req,res)=>{
    console.log("controller 1");
    // req.checkBody('email', 'Email is not valid').isEmail();
    // req.checkBody('password', 'password is not valid').isLength({ min: 6 });

    //**var errors=req.validationErrors();
    var errors=false;
    responseresult={}
    if(errors) {
        responseresult.success=false;
        responseresult.message=errors;
        return res.status(400).send(responseresult);
    }
    else {
        userservice.login(req.body,(err,data)=>{
        if(err) {
            responseresult.success=false;
            responseresult.error=err;
            return res.status(400).send(responseresult);
        }
        else {
            email=req.body.email
            let token1=jwt.sign({'_id':data._id}, config.secret, {expiresIn : '1d'});
            
            console.log("controller 2",data);
            client.set(token1, token1,redis.print)
            // client.keys('*',(err,reply) => {
            //     if(err)
            //     console.log(err);
            //     else
            //     console.log(reply);
                
            // })
            return res.status(200).send({
                message:'token generated and login successfull',
                token:token1,
                firstname: data.firstName,
                imgUrl: data.imgUrl
            });
        }

    })
    }
}

exports.forgotPassword=(req,res)=>{
    const responseresult={}
    userservice.forgotPassword(req.body,(err,data)=>{
        console.log(data);
        if(err) {
            responseresult.success=false,
            responseresult.error=err,
            res.status(400).send(responseresult)
        }
        else{
            const payload={
                id:req.body._id
            }
            var obj=token.generateToken(payload);
            const url=`http://localhost:4200/resetpassword/:${obj.token}`;
            nodemailer.sendmail(url,req.body.email);
            res.status(200).send(url);
        }
    })
}


exports.resetPassword=(req,res)=>{
    console.log("In a controller resetPassword");
    userservice.resetPassword(req.body,(err,result)=>{
        if(err) {
            responseresult.success=false;
            responseresult.error=err;
            res.status(400).send(responseresult);
        }
        else {
            console.log("Password reset successfully");
            responseresult.success=true;
            responseresult.result=result;
            res.status(200).send(responseresult);
        }
    })
}
    exports.uploadFile= (req,res) => {
    try{
            var response = { };

            userservice.uploadServices(req,(err,result) => {
            if(err){
                response.sucess = false,
                response.error = err,
                res.status(400).send(response)
            }
            else{
                response.sucess = true,
                response.result = req.file.location,
                res.status(200).send(response);
            }
        })
    }
        catch(error){
            console.log("file upload Controller Catch ");
            res.status(400).send({
                success : false,
                message : "file upload Controller catch"
            });
        } 
 }

