/*********************************************************************************************************************
 * @purpose : here we write notes schemas and api
 * @File : notemodel.js
 * @author : DipakPatil
 * @version : 1.0
 * @since :
 ***********************************************************************************************************************/


var mongoose=require("mongoose");

var noteSchema=new mongoose.Schema({

   userid:{
       type: String
   },

   title: {type: String}
    ,

   description:{
       type:String
   },
   label:[
        {
            type:String
            //**type: mongoose.Schema.Types.ObjectId,
            //**ref: label
        }
    ],

   color:{
       type:String
   },

   archive:{
       type:Boolean,
       default: false       

    },

   reminder:[{
            //**type:Date
            type:String
        }]
    ,
   trash:{
       type: Boolean,
       default: false
   }    

});
var note=mongoose.model('userNotes',noteSchema);


/**
 * @Description : Add Label Schema
 */

var labelSchema=new mongoose.Schema({

    noteid :{
        type: mongoose.Schema.Types.ObjectId, ref: note
    },
    label:{
        type: String
    },
    userid: {
       type: String
    }

})
var label=mongoose.model("label",labelSchema);




class NoteModel{

/**
 * @Description : here we save notes
 */

 
    // addNotes(noteObj,callback){
    //     console.log("Note model addNotes",req.body);
    //             var newnotes=new note({
    //                 userid: noteObj._id,
    //                 title: noteObj.title,
    //                 label: noteObj.label,
    //                 description:noteObj.description,
    //                 color: noteObj.color,
    //                 reminder:noteObj.reminder,
    //                 archive: noteObj.archive,
    //             })
    //            // reminder: req.body.reminder

    //         newnotes.save((err,result)=>
    //         {
    //             if(err){
    //                 console.log("Error in saving data",err);
    //                     return callback(err);
    //             }
    //             else {
    //                 console.log("Successfully save",result);
    //                     return callback(null, result);
    //             }
    //         });
    // }
     

    async addNotes(noteObj,callback){
       try{ 
        console.log("Note model addNotes",noteObj);
                var newnotes=new note({
                    userid: noteObj._id,
                    title: noteObj.title,
                    label: noteObj.label,
                    description:noteObj.description,
                    color: noteObj.color,
                    reminder:noteObj.reminder,
                    archive: noteObj.archive,
                    trash:noteObj.trash
                })
               // reminder: req.body.reminder
                var notes= await newnotes.save();
                return callback(null,notes);
       } catch(err) {
           console.log(err);
           return callback(err);

       }
    }

/**
 * @Description : Here update existing note
 */
    // updateNotes(body,callback) {
    //     console.log("notemodel");
    //     note.updateOne({"userid":body.userid},{
    //         $set:{
    //                 "description":body.description
    //              }
    //     },(err,result)=>{
    //         if(err) {
    //             console.log("Error in finding user id:-",err);
    //             return callback(err);
    //         }
    //         else {
    //             console.log("Update successfully",result);
    //             return callback(null,result);
    //         }

    //     })
    // }

    async updateNotes(noteObj,callback) {
        console.log("notemodel",noteObj);
        var promise=new Promise((resolve,reject)=>{
            note.updateOne({"_id":noteObj._id,"userid":noteObj.userid},{
                $set:{
                        title: noteObj.title,
                        label: noteObj.label,
                        description:noteObj.description,
                        color: noteObj.color,
                        reminder:noteObj.reminder,
                        archive: noteObj.archive
                     }
            },(err,result)=>{
                if(err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }

        })
    })

    promise.then((result)=>{
        console.log(result);
        return callback(null,result);
    }).catch((err)=>{
        console.log(err);
        return callback(err);
    })
}
   


/**
 * @Description : using this api get all notes from database
 */

    // getAllNotes(body,callback) {
    //     note.find({},(err,result)=> {
    //         if(err) {
    //             console.log("Userid does not find in our database",err);
    //             return callback(err);
    //         }
    //         else{
    //             //console.log("Successfully Run",result);
    //             return callback(null,result);
    //         }

    //     });
    // }

    async getAllNotes(body,callback) {
       try{ 
        var result=await note.find({});
        return callback(null,result);
       }catch(err){
            console.log(err);
            return callback(err);
       }
    }

/**
* @description: Here All The Populate notes from labels
* @param {*} noteobj 
* @param {*} callback 
*/
    // getPopulateNotes(noteObj,callback) {
    //     console.log("Model 1",noteObj);
    //     label.findOne({label:noteObj.label}).populate('note').exec((err ,result)=>{
    //         console.log("Model 2",result);
    //         if(err) {
    //             console.log(err);
    //             return callback(err);
    //         }
    //         else {
    //             console.log(result);
    //             return callback(null,result);
    //         }
    //     })
    // }
/**
 * @Description : Here all the archive notes are displayed
 */
// archiveNotes(archiveobj,callback) {
//     note.find({'userid':archiveobj._id,'archive':true,'trash':false},(err,result)=>{
//         console.log("notemodel",result)
//         if(err) {
//             console.log("Error in finding trash");
//             return callback(err);
//         }
//         else {
//             console.log(result);
//             return callback(null,result);
//         }
//     })
// }

async getArchiveNotes(archiveObj,callback) {
    var promise=new Promise((resolve,reject)=>{
        note.find({'userid':archiveObj.userid,'archive':true,'trash':false},(err,result)=>{
           if(err) {
               reject(err);
           }
           else {
               resolve(result);
           }
        })
    })
    promise.then(function(result){
        return callback(null,result)
    }).catch(function(err){
        console.log(err);
        return callback(err)
    })
}

/**
 * @Description : Here update notes to the Archive
 */
    // updateArchiveNotes(archiveObj,callback) {
    //         console.log("notemodel 1",archiveObj);
    //     note.updateOne({'userid': archiveObj.userid ,'_id': archiveObj._id},
    //                {$set:{'archive': archiveObj.isArchive}},(err,result)=>{
    //                    console.log("notemodel 2");
    //                    if(err) {
    //                        console.log("Error in notemodel");
    //                        return callback(err);
    //                    }
    //                    else{
    //                         console.log(result);
    //                         return callback(null,result);
    //                    }
    //                } )
    // }

 async updateArchiveNotes(archiveObj,callback) {
        console.log("notemodel 1",archiveObj);
    var promise=new Promise((resolve,reject)=>{    
    note.updateOne({'userid': archiveObj.userid ,'_id': archiveObj._id},
               {$set:{'archive': archiveObj.isArchive}},(err,result)=>{
                    if(err) {
                        reject(err);
                    }   
                    else {
                        resolve(result)
                    }

               })
            })
            promise.then((result)=>{
                console.log("Model Result");
                return callback(null,result);
            }).catch((err)=>{
                console.log(err);
                return callback(err);    
            }) 
}

/**
 * @Description : Here update note Color
 */
// updateColorNotes(colorObj,callback) {
//     console.log("notemodel 1",colorObj);
// note.updateOne({'userid': colorObj.userid ,'_id': colorObj._id},
//                {$set:{'color': colorObj.color}},(err,result)=>{
//                    console.log("notemodel 2");
//                    if(err) {
//                        console.log("Error in notemodel",err);
//                        return callback(err);
//                    }
//                    else{
//                         console.log(result);
//                         return callback(null,result);
//                    }
//                } )
// }


async updateColorNotes(colorObj,callback) {
    console.log("notemodel 1",colorObj);
    var promise=new Promise((resolve,reject)=>{
note.updateOne({'userid': colorObj.userid ,'_id': colorObj._id},
               {$set:{'color': colorObj.color}},(err,result)=>{
                   if(err) {
                        reject(err);
                   }
                   else {
                       resolve(result);
                   }
            })
        })

    promise.then((result)=>{
        console.log(result);
        return callback(null,result);
    }).catch((err)=>{
        console.log(err);
        return callback(err);
    })
    
}


/**
 * @Description : Here all the trash notes are displayed
 */
    // trashNotes(body,callback) {
    //     note.find({'trash':true},(err,result)=>{
    //         console.log(result)
    //         if(err) {
    //             console.log("Error in finding trash");
    //             return callback(err);
    //         }
    //         else {
    //             console.log(result);
    //             return callback(null,result);
    //         }
    //     })
    // }

    async trashNotes(body,callback) {
        var promise=new Promise((resolve,reject)=>{
        note.find({'trash':true},(err,result)=>{
            console.log(result)
            if(err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    })

    promise.then((result)=>{
        console.log(result);
        return callback(null,result);

    }).catch((err)=>{
        console.log(err);
        return callback(err);
    })
}

/**
 * @Description : Here all the update Trash notes
 */
    async updateTrashNotes(trashObj,callback) {
        console.log("notemodel 1",trashObj);
        var promise=new Promise((resolve,reject)=>{
        note.updateOne({'userid': trashObj.userid ,'_id': trashObj._id},
               {$set:{'trash': trashObj.trash}},{upsert:true},(err,result)=>{
                   if(err) {
                        reject(err);
                   }
                   else {
                       resolve(result);
                   }
               })
        })

        promise.then((result)=>{
            console.log(result);
            return callback(null,result);
        }).catch((err)=>{
            console.log(err);
            return callback(err)
        })
}

/**
 * @Description : using this api delete all notes from the database
 */
    // deleteNotes(body,callback) {
    //     note.deleteOne({'_id':body.noteid},(err,result)=>{
    //         if(err) {
    //             console.log("_id doesn't match",err);
    //             return callback(err);
    //         }
    //         else {
    //             console.log("Successfully Run ",result);
    //             return callback(null,result);
    //         }
    //     })
    // }

    async deleteNotes(body,callback) {
        var promise=new Promise((resolve,reject)=>{
        note.deleteOne({'_id':body.noteid},(err,result)=>{
            if(err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    })

        promise.then((result)=>{
            console.log(result);
            return callback(null,result);
        }).catch((err)=>{
            console.log(err);
            return callback(err);
        })
    }

/**
 * @description : Populate Label 
 * @param {*} labelObj 
 * @param {*} callback 
 */

    

/**
 * @Description : Using this api here we add label
 */
    async addLabel(labelObj,callback) {
        console.log(labelObj);
       
        const newLabel=new label({
            label:labelObj.label,
            userid: labelObj.userid
        })
        
        
        var promise=new Promise((resolve,reject)=>{
        newLabel.save((err,result)=>{
            if(err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    })
    
    promise.then((result)=>{
        console.log(result);
        return callback(null,result);
    }).catch((err)=>{
        console.log(err);
        return callback(err);
    })
}
/**
 * @Description : Get Label
 */
    async getLabel(labelObj,callback) {
        console.log(labelObj);  
        var promise=new Promise((resolve,reject)=>{

        label.find({'userid':labelObj.userid},(err,result)=>{
            if(err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    })

    promise.then((result)=>{
        console.log(result);
        return callback(null,result);
    }).catch((err)=>{
        console.log(err);
        return callback(err);
    })

    }
/**
 * @Description : Update Label 
 */  
    async updateLabel(labelObj,callback) {
        console.log(labelObj);  
        var promise=new Promise((resolve,reject)=>{
          label.updateOne({'userid':labelObj.id,'_id':labelObj._id},{
                    $set:{ 'label':labelObj.label } },(err,result)=>{
            if(err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    })

    promise.then((result)=>{
        console.log(result);
        return callback(null,result);
    }).catch((err)=>{
        console.log(err);
        return callback(err);
    })
}

/**
 * @Description : Delete Label
 */
    async deleteLabel(labelObj,callback) {
        console.log("label model",labelObj);  
        var promise=new Promise((resolve,reject)=>{
        label.delete({'userid':labelObj.id,'_id':labelObj._id},(err,result)=>{
            if(err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    })

    promise.then((result)=>{
        console.log(result);
        return callback(null,result);
    }).catch((err)=>{
        console.log|(err);
        return callback(err);
    })
    }

/**
 * @description : Add Reminder
 * @param {*} reminderObj 
 * @param {*} callback 
 */
    async addReminder(reminder,callback) {
    console.log('NoteModel 1',reminder);
        var promise=new Promise((resolve,reject)=>{
            note.findOneAndUpdate({'_id':reminder.noteid},
            {
                $push:{
                 'reminder':reminder.reminder
                }
            },
            (err,result)=>{
                if(err){
                    reject(err);
                }
                else {
                    resolve(result);
                }
            })
        })
      
    promise.then((result)=>{
        console.log(result);
        return callback(null,result);
    }).catch((err)=>{
        console.log(err);
        return callback(err);
    })
    
}
 
/**
 * @description : Delete Reminder
 */
    async deleteReminder(reminderObj,callback) {
        console.log('NoteModel 1',reminderObj);
        var promise=new Promise((resolve,reject)=>{
            note.findOneAndUpdate({'_id':reminderObj.noteid},
            {
                $pull: { 'reminder':reminderObj.reminder } 
            },(err,result)=>{
                console.log("Note model 2",result);
                if(err) {
                    reject(err);    
                }
                else {
                    resolve(result);
                }
            })
        })

        promise.then((result)=>{
            console.log(result);
            return callback(null,result);
        }).catch((err)=>{
            console.log(err);
            return callback(err);
        })
    }
}


module.exports=new NoteModel();