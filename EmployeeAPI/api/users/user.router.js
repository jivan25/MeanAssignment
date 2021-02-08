const {creatUser,login}= require('./user.controller')
const router= require("express").Router();

router.post("/",creatUser);
router.post("/login",login);

module.exports= router;



