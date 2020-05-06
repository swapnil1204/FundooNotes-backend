/*********************************************************************************************************************
 *  @Purpose : Here we execute our all connections 
 *  @File :  server.js
 *  @Author : DipakPatil
 *  @Version : 1.0
 *  @Since : 
 ***********************************************************************************************************************/
var routes=require("./routes/routes");
var mongoose=require("mongoose");
var cors=require("cors");
var config=require("./configuration/dbconfig");
var bodyparser=require('body-parser');
var expressValidator=require('express-validator');
redis=require("redis");

const dotenv=require('dotenv');
dotenv.config();
var express=require('express');
var app=express();
app.use(cors());
/* Here, resdis createclient function is declared */

client=redis.createClient(6379);

/* Connection of redis cache */
 client.on('connect', function(){
    console.log("Connected to redis");
 } )

/* use expressvalidator for validating data coming from request*/
//app.use(expressValidator());

/* use body-parser for to take parsing our json data*/
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
/* Here call routes function */
app.use('/',routes);
/*Server Establishment*/
app.listen(4000,()=>{
   console.log("Connect to the port number 4000",);
});

mongoose.promise=global.promise;
/*Connect to the Database*/
mongoose.connect(config.url,{useNewUrlParser:true,useUnifiedTopology: true}).then(
    ()=>{   console.log("Connected to database") },
    err=>{  console.log("Error in connection",err)}
) 


const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title:"customer Api",
            description:"customer api information",
            contact:{
                name:"dynamic developer"
            },
            servers:"http://localhost:4000"
        }
    },
    apis:['routes/routes.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerDocs));


module.exports=app;



//githhub

//node-fetch and redis