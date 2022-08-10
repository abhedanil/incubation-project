const {register, login,userApplication,getstatus,Viewapplication} = require('../Controllers/AuthControllers')
const { checkUser } = require("../Middlewares/AuthMiddleware");
const router = require ("express").Router();



router.post("/",checkUser)
router.post("/register",register)
router.post("/login", login)
router.post("/userApplication",userApplication)
router.get('/status/:id',getstatus)
router.get('/viewapplication/:id',Viewapplication)

module.exports = router; 