/*********************************************************************************************************************
 * @purpose : Here we write all note services
 * @File : notesevice.js
 * @author : DipakPatil
 * @version : 1.0
 * @since : 
 ***********************************************************************************************************************/


var notemodel=require('../model/notemodel');
 
module.exports.noteaddServices=(req,callback)=>{
    console.log("Service 1");
    notemodel.addNotes(req,(err,data)=>{
        console.log("Service 2");
        if(err) {
            return callback(err);
        }
        else{
            return callback(null,data);
        }

    });
}

module.exports.noteUpdateServices=(noteObj,callback)=>{
    console.log("Service 1");
    notemodel.updateNotes(noteObj,(err,data)=>{
        console.log("Service 2");
        if(err) {
            return callback(err);
        }
        else {
            return callback(null,data);
        }
    })
}



module.exports.getAllNoteService=(body,callback)=>{
    notemodel.getAllNotes(body,(err,data)=>{
        if(err) {
            return callback(err);
        }
        else {
            return callback(null,data);
        }
    })
}

/*Get All Populate notes*/
module.exports.getPopulateNotes=(noteObj,callback)=>{
    console.log("Service 1");
    notemodel.getPopulateNotes(noteObj,(err,data)=>{
        console.log("service 2");
        if(err) {
            return callback(err);
        }
        else {
            return callback(null,data);
        }
    })
}


module.exports.noteUpdateLabel=(body,callback)=>{
    notemodel.updateLabel(body,(err,data)=>{
        if(err){
            return callback(err);
        }
        else {
            return callback(null,data);
        }
    })
}


module.exports.noteArchiveServices=(archiveobj,callback)=>{
    notemodel.getArchiveNotes(archiveobj,(err,data)=>{
        if(err) {
            return callback(err);   
        }
        else {
            return callback(null,data);
        }
    })
}

module.exports.noteUpdateArchiveServices=(archiveObj,callback)=>{
    console.log("service 1");
    notemodel.updateArchiveNotes(archiveObj,(err,data)=>{
        console.log("service 2");
        if(err) {
            return callback(err);
        }
        else {
            return callback(null,data);
        }
    })
}

module.exports.noteUpdateColorServices=(colorObj,callback)=>{
    console.log("service 1");
    notemodel.updateColorNotes(colorObj,(err,data)=>{
        console.log("service 2");
        if(err) {
            return callback(err);
        }
        else {
            return callback(null,data);
        }
    })
}


/**
 * @Description : Here Get All the Trash Component
 */
module.exports.noteTrashServices=(body,callback)=>{
    notemodel.trashNotes(body,(err,data)=>{
        if(err) {
            return callback(err);
        }
        else {
            return callback(null,data);
        }
    })
}

/** 
 * @Description : Here Update Trash Component 
 */ 
module.exports.noteUpdateTrashServices=(trashObj,callback)=>{
    console.log("service 1");
    notemodel.updateTrashNotes(trashObj,(err,data)=>{
        console.log("service 2");
        if(err) {
            return callback(err);
        }
        else {
            return callback(null,data);
        }
    })
}


module.exports.noteDeleteServices=(body,callback)=>{
    notemodel.deleteNotes(body,(err,data)=>{
    if(err) {
        return callback(err);
    }
    else {
        return callback(null,data);
    }
})
}


/* Add Label*/
module.exports.noteAddLabelServices=(labelObj,callback)=>{
    console.log("Service  ", labelObj)
    notemodel.addLabel(labelObj,(err,data)=>{
        if(err) {
            return callback(err);
        }
        else {
            return callback(null,data);
        }
    })
}

/* Get Label */
module.exports.noteGetLabelServices=(labelObj,callback)=>{
    console.log("Service  ", labelObj)
    notemodel.getLabel(labelObj,(err,data)=>{
        if(err) {
            return callback(err);
        }
        else {
            return callback(null,data);
        }
    })
}

/* Update Label */
module.exports.noteUpdateLabelServices=(labelObj,callback)=>{
    console.log("Service  ", labelObj)
    notemodel.updateLabel(labelObj,(err,data)=>{
        if(err) {
            return callback(err);
        }
        else {
            return callback(null,data);
        }
    })
}

/*Delete Label */
module.exports.noteDeleteLabelServices=(labelObj,callback)=>{
    console.log("Service  ", labelObj)
    notemodel.deleteLabel(labelObj,(err,data)=>{
        if(err) {
            return callback(err);
        }
        else {
            return callback(null,data);
        }
    })
}
/* Add Reminder */

module.exports.noteAddReminderServices=(reminder,callback)=>{
    console.log("Service  1", reminder)
    notemodel.addReminder(reminder,(err,data)=>{
        console.log("Service 2");
        if(err) {
            return callback(err);
        }
        else {
            return callback(null,data);
        }
    })
}

/*Delete Reminder*/
module.exports.noteDeleteReminderServices=(reminderObj,callback)=>{
    console.log("Service  1", reminderObj)
    notemodel.deleteReminder(reminderObj,(err,data)=>{
        console.log("Service 2");
        if(err) {
            return callback(err);
        }
        else {
            return callback(null,data);
        }
    })
}


