/*********************************************************************************************************************
 * @purpose : Here write all routes
 * @File : routes.js
 * @author : DipakPatil
 * @version : 1.0
 * @since :
 ***********************************************************************************************************************/


var express=require('express');
var router=express.Router();
var userController=require('../controller/usercontroller');
var noteController=require('../controller/notecontroller.js');
var middleware=require('../middleware/index');
//var upload = require('../middleware/img-uploading')

router.post('/register',userController.register);
router.post('/verification/:token',middleware.checkToken,userController.verification);
router.post('/login',userController.login);
router.post('/forgotPassword',userController.forgotPassword);
router.post('/resetPassword/:token',middleware.checkToken,userController.resetPassword);
router.post('/uploadimg',middleware.checkToken,userController.uploadFile);
/*Post the Data into notes */
router.post('/notes',middleware.checkToken,noteController.noteAddController);
/*Get Data Into Notes */
//*****router.get('/notes',middleware.checkToken,noteController.getAllNoteController);
router.get('/notes',noteController.getAllNoteController);

/*Get Populate Notes */
//router.get('/populatenotes',middleware.checkToken,noteController.getPopulateNotes);
/*Update data of Notes */
router.put('/notes',middleware.checkToken,noteController.noteUpdateController);
//router.put('/updatelabel',noteController.noteUpdateLableController);
/* Update Color */
router.put('/updatecolor',middleware.checkToken,noteController.noteUpdateColorController)

/*Get Archive Notes */
router.get('/archive',middleware.checkToken,noteController.noteArchiveController);
/*Update Archive notes*/
router.put('/addArchive',middleware.checkToken,noteController.noteUpdateArchiveController)
/*Get Trash Notes */
router.get('/trash',middleware.checkToken,noteController.noteTrashController)
/* Update Trash Notes */
router.put('/addTrash',middleware.checkToken,noteController.noteUpdateTrashController)
/* Post Label */
router.post('/label',middleware.checkToken,noteController.noteAddLabelController);
/* Get All Label */
router.get('/getlabel',middleware.checkToken,noteController.noteGetAllLabelController)
/* update Label */
router.put('/updatelabel',middleware.checkToken,noteController.noteUpdateLabelController)
/*Delete Label */
router.delete('/deletelabel',middleware.checkToken,noteController.noteDeleteLabelController)
/*Add Reminder */
router.post('/addreminder',middleware.checkToken,noteController.noteAddReminderController)
/*Delete Reminder */
router.post('/deletereminder',middleware.checkToken,noteController.noteDeleteReminderController);
module.exports=router;