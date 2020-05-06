/** *******************************************************************************************************************
 * @purpose : here, write our note controller to sending req to backend or to sending res to frontend
 * @File : notecontroller.js
 * @author : DipakPatil
 * @version : 1.0
 * @since :
 ***********************************************************************************************************************/

var noteservice=require('../services/noteserrvice');

exports.noteAddController=(req,res)=>{
    console.log("Add note Controller hbjjbbh ");
    console.log(req.decoded._id);
    //req.checkBody('description','Description is required').not().isEmpty();
    //var errors=req.validationErrors();
    var errors=false;
    var noteObj={
        _id:req.decoded._id,
        title: req.body.title,
        label: req.body.label,
        description:req.body.description,
        color: req.body.color,
        reminder:req.body.reminder,
        archive: req.body.archive,
        trash:req.body.trash
    }
    responseResult={};
    if(errors){
        responseResult.success=false;
        responseResult.error=errors;
        return res.status(400).send(responseResult)
    }
    else {
    noteservice.noteaddServices(noteObj,(err,result)=>{
        console.log("Addnote controller 2",result);
        
        if(err) {
            responseResult.sucess=false;
            responseResult.error=err;
            res.status(400).send(responseResult);
        }
        else {
            responseResult.sucess=true;
            responseResult.result=result;
            res.status(200).send(responseResult);
        }
    })
}
}

module.exports.noteUpdateController=(req,res)=>{
    responseResult={};
    console.log("controller 1");


    var noteObj={
        _id:req.body.noteid,
        userid:req.decoded._id,
        title: req.body.title,
        label: req.body.label,
        description:req.body.description,
        color: req.body.color,
        reminder:req.body.reminder,
        archive: req.body.archive
    }
    noteservice.noteUpdateServices(noteObj,(err,result)=>{
        console.log("Controller 2")
        if(err) {
            responseResult.success=false;
            responseResult.error=err;
            res.status(400).send(responseResult);
        }
        else{
            console.log("return data in controller ",result);
            responseResult.success="note successfully saved";
            responseResult.result=result;
            res.status(200).send(responseResult);
        }
    })
}


module.exports.getAllNoteController=(req,res)=>{
    responseResult={};
    noteservice.getAllNoteService(req.body,(err,result)=>{
        if(err) {
            responseResult.success=false;
            responseResult.error=err;
            res.status(400).send(responseResult);
        }
        else {
            responseResult.success=true;
            responseResult.result=result;
            res.status(200).send(responseResult);
        }
    })
}

// module.exports.getPopulateNotes=(req,res)=>{
//     responseResult={};
//     noteObj={
//         // id:req.decoded._id,
//         // noteid: req.body.noteid,
//         // _id: req.body.label,
//         label:req.body.label
//     }
//     console.log("Controller 1");
//     noteservice.getPopulateNotes(noteObj,(err,result)=>{
//         console.log("Controller 2");
//         if(err) {
//             responseResult.success=false;
//             responseresult.error=err;
//             res.status(400).send(responseResult);
//         }
//         else {
//             responseResult.sucess=true;
//             responseResult.result=result;
//             res.status(200).send(responseResult);
//         }
//     })
// }

module.exports.noteArchiveController=(req,res)=>{
    console.log("Controller 1");
    console.log(req.decoded._id);
    archiveobj={
        userid:req.decoded._id
    }
    responseResult={};
    noteservice.noteArchiveServices(archiveobj,(err,result)=>{
        console.log("Controller 2",result);
        if(err) {
            responseResult.success=false;
            responseResult.error=err;
            res.status(400).send(responseResult);
        }
        else {
            responseResult.success=true;
            responseResult.result=result;
            res.status(200).send(responseResult);
        }
     })
} 

module.exports.noteUpdateColorController=(req,res)=>{
    console.log("Controller 1",req.body);
    
    req.checkBody('id','_id is required').not().isEmpty();
    req.checkBody('color','color required').not().isEmpty();
    var errors=req.validationErrors();


    colorObj={
        userid:req.decoded._id,
        _id:req.body.id,
        color:req.body.color
    }
    console.log(colorObj);
    responseResult={}
    if(errors) {

    }
    else {
    noteservice.noteUpdateColorServices(colorObj,(err,result)=>{
        console.log("Controller 2");
        if(err) {
            responseResult.success=false;
            responseResult.error=err;
            res.status(400).send(responseResult);
        }
        else {
            responseResult.success=true;
            responseResult.message=result;
            res.status(200).send(responseResult);
        }
    })
}

}

module.exports.noteUpdateArchiveController=(req,res)=>{
    console.log("controller 1",req.body);
    req.checkBody('id','id required').not().isEmpty();
    req.checkBody('isArchive','isArchive Required').not().isEmpty();
    var errors=req.validationErrors();

    archiveObj={
        userid:req.decoded._id,
        _id:req.body.id,
        isArchive:req.body.isArchive
    }
    responseResult={}
    if(errors){
        responseResult.sucess=false;
        responseResult.message=errors;
    }
    else{
        noteservice.noteUpdateArchiveServices(archiveObj,(err,result)=>{
            console.log("Controller 2");
            if(err) {
                responseResult.success=false;
                responseResult.error=err;
                res.status(400).send(responseResult);
            }
            else {
                responseResult.success=true;
                responseResult.message=result;
                res.status(200).send(responseResult);
            }
        })
    }
}

/**
 * @Description : Here Get All The Trash Notes
 */

module.exports.noteTrashController=(req,res)=>{
    console.log("Controller 1");
    
    responseResult={};
    noteservice.noteTrashServices(req.body,(err,result)=>{
        console.log("Controller 2",result);
        if(err) {
            responseResult.success=false;
            responseResult.error=err;
            res.status(400).send(responseResult);
        }
        else {
            responseResult.success=true;
            responseResult.result=result;
            res.status(200).send(responseResult);
        }
     })
}

/**
 *  @Description : Update Trash Api
 */

module.exports.noteUpdateTrashController=(req,res)=>{
    console.log("controller 1",req.body);

    req.checkBody('id','id required').not().isEmpty();
    req.checkBody('isTrash','isTrash Required').not().isEmpty();
    var errors=req.validationErrors();

    trashObj={
        userid:req.decoded._id,
        _id:req.body.id,
        trash:req.body.isTrash
    }
    var responseResult={}
    if(errors) {
        responseResult.success=false;
        responseResult.message=errors;
        res.status(200).send(responseResult);
    }
    else {
        noteservice.noteUpdateTrashServices(trashObj,(err,result)=>{
            console.log("Controller 2");
            if(err) {
                responseResult.success=false;
                responseResult.error=err;
                res.status(400).send(responseResult);
            }
            else {
                responseResult.success=true;
                responseResult.result=result;
                res.status(200).send(responseResult);
            }
        })
    }
}

/*Delete note*/
module.exports.noteDeleteController=(req,res)=>{
    console.log("Controller 1");
    responseResult={};
    noteservice.noteDeleteServices(req.body,(err,result)=>{
        console.log("Controller 2");
        if(err) {
            responseResult.success=false;
            responseResult.error=err;
            res.status(400).send(responseResult);
        }
        else {
            responseResult.success=true;
            responseResult.result=result;
            res.status(200).send(responseResult);
        }
    })
}

/* Add Label */
module.exports.noteAddLabelController=(req,res)=>{
    try{
    console.log("Controller 1");
    const labelObj={
        userid:req.decoded._id,
        label: req.body.labelname
    }
    const responseResult={}
    console.log(labelObj)
    noteservice.noteAddLabelServices(labelObj,(err,result)=>{
        console.log("controller 2");
        if(err){
            responseResult.success=false;
            responseResult.error=err;
            res.status(400).send(responseResult);
        }
        else {
            responseResult.success=true;
            responseResult.result=result;
            res.status(200).send(responseResult);
        }
    })
}catch(err){
    console.log("in catch",err);
    res.status(400).send(err);
}
}

/* Get All Labels */
module.exports.noteGetAllLabelController=(req,res)=>{
    console.log("Controller 1");
    labelObj={
        userid: req.decoded._id,
    }
    responseResult={}
    noteservice.noteGetLabelServices(labelObj,(err,result)=>{
    if(err) {
        responseResult.success=false;
        responseResult.error=err;
        res.status(400).send(responseResult);
    }
    else {
        responseResult.success=true;
        responseResult.result=result;
        res.status(200).send(responseResult);
    }
})
}

/* Update Label */

module.exports.noteUpdateLabelController=(req,res)=>{
    console.log('Controller 2');
    labelObj={
        userid:req.decoded._id,
        _id:req.body._id
    }
    responseResult={}
    noteseervice.noteUpdateLabelServices(labelObj,(err,result)=>{

        if(err) {
        responseResult.success=false;
        responseResult.error=err;
        res.status(400).send(responseResult);
    }
    else {
        responseResult.success=true;
        responseResult.result=result;
    }
})
}
/*Delete Label*/
module.exports.noteDeleteLabelController=(req,res)=>{
    console.log('Controller 2');
    labelObj={
        userid:req.decoded._id,
        _id:req.body._id
    }
    responseResult={}
    noteseervice.noteUpdateLabelServices(labelObj,(err,result)=>{

        if(err) {
        responseResult.success=false;
        responseResult.error=err;
        res.status(400).send(responseResult);
    }
    else {
        responseResult.success=true;
        responseResult.result=result;
    }
})
}

/**
 * @description : Add Reminder
 */

module.exports.noteAddReminderController=(req,res)=>{
    console.log("Body",req.body);
    reminder={
        noteid:req.body.id,
        reminder: req.body.reminder
    }
    responseResult={}
    console.log("Controller 1");
    noteservice.noteAddReminderServices(reminder,(err,result)=>{
        console.log('controller 2');
        if(err){
            console.log(err);
            responseResult.success=false;
            responseResult.error=err;
            res.status(400).send(responseResult);
        }
        else {
            responseResult.success=true;
            responseResult.result=result;
            res.status(200).send(responseResult);
        }
    })

} 
/**
 * @description : Delete Reminder
 */

module.exports.noteDeleteReminderController=(req,res)=>{
    console.log('Controller 1');
    console.log("body",req.body);
    reminderObj={
        
        noteid:req.body.id,
        reminder:req.body.reminder
    }
    responseResult={}
    noteservice.noteDeleteReminderServices(reminderObj,(err,result)=>{
        console.log('Controller 2');
        if(err) {
        responseResult.success=false;
        responseResult.error=err;
        res.status(400).send(responseResult);
    }
    else {
        responseResult.success=true;
        responseResult.result=result;
        res.status(200).send(responseResult);
    }
})
}