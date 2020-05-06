/*********************************************************************************************************************
 * @purpose : Here we verify Token
 * @File : index.js
 * @author : DipakPatil
 * @version : 1.0
 * @since :
 ***********************************************************************************************************************/


var jwt=require("jsonwebtoken");
var config=require("../configuration/dbconfig");

const checkToken=(req,res,next) => {
    console.log(req.body);
    console.log(req.headers);
    
    let token1=req.headers['token'];
    
    client.get(token1,(err,print)=>{
        console.log("hggchgch",print);
    if(err) {
        console.log("Error in Get token");
    }    
    else if(print) {
        jwt.verify(print,config.secret,(err,decoded)=>{
            if(err) {
                return res.send({
                    success: false,
                    message : "token is not valid"
                })
            }
            else {
                console.log("Valid Token");
                req.decoded=decoded;
                next();
            }
        
        });
    } else {
        return res.send({
            success: false,
            message : "Auth token is not supplied"
        })
    }
})
};

// const checkRedis=(req,res,next) => {
//     //let token1=req.headers['token'];
//     var redisToken=client.get("token",(err,print)=>{
//         if(err) {
//             console.log("Error in redis",err);
//         }
//         else {
//             console.log("run successfully",print);
//         }
//     })
//     if(redisToken) {
//         jwt.verify(redisToken,config.secret,(err,decoded)=>{
//             if(err) {
//                 return res.send({
//                     success: false,
//                     message : "token is not value"
//                 })
//             }
//             else {
//                 req.decoded=decoded;
//                 next();
//             }
        
//         });
//     } else {
//         return res.send({
//             success: false,
//             message : "Auth token is not supplied"
//         })
//     }
// };



module.exports={
    checkToken:checkToken,
//    checkRedis: checkRedis
}