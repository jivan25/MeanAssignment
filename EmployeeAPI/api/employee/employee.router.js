const {createEmployee,getEmployee,getEmployeeById,updateEmployee,deleteEmployee}= require('./employee.controller')
const router= require("express").Router();
const {checkToken} =require("../../auth/token_validation")

router.post("/",checkToken,createEmployee);
router.get("/",checkToken,getEmployee);
router.get("/:id",checkToken,getEmployeeById);
router.put("/",checkToken,updateEmployee);
router.delete("/:id",checkToken,deleteEmployee);

module.exports= router;