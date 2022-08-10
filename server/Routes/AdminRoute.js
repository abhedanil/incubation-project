const express =require('express')

let router = express.Router()

const {checkAdmin} = require('../Middlewares/AdminMiddleware')
const {adminlogin,newdata,changeStatus,PendingApplications,AllApplications,allSlots,SlotUpdate,viewApplication} = require('../Controllers/adminControllers')

router.post('/',checkAdmin)
router.post("/login",adminlogin)
router.get('/newdata',newdata)
router.get('/alldata',AllApplications)
router.get("/pendingapplications",PendingApplications)
router.post('/changeStatus',changeStatus)
router.get('/allslots',allSlots)
router.post('/slotUpdate',SlotUpdate)
router.get('/viewApplication/:id',viewApplication)

module.exports=router;