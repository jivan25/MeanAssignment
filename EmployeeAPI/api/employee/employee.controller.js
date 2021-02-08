const {create,getEmployee,getEmployeeById,updateEmployee,deleteEmployeeById}= require("./employee.service");


module.exports={
    createEmployee:(req,res)=>{
        const body= req.body
        create(body,(err,result)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                })
            }
            return res.status(200).json({
                success:1,
                data:result
            })
        })
    },
    getEmployeeById:(req,res)=>{
        const id= req.params.id
        getEmployeeById(id,(err,result)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                })
            }
            if(!result){
                return res.status(400).json({
                    success:0,
                    message:"Record not Found"
                })
            }
            return res.status(200).json({
                success:1,
                data:result
            })
        })
    },
    getEmployee:(req,res)=>{
        getEmployee((err,result)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                })
            }
            if(!result){
                return res.status(400).json({
                    success:0,
                    message:"Record not Found"
                })
            }
            return res.status(200).json({
                success:1,
                data:result
            })
        })
    },
    updateEmployee:(req,res)=>{
        const body= req.body
        updateEmployee(body,(err,result)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                })
            }
            return res.status(200).json({
                success:1,
                message:"Record Updated Succesfully"
            })
        })
    },
    deleteEmployee:(req,res)=>{
        const id= req.params.id
        deleteEmployeeById(id,(err,result)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                })
            }
            if(result===0){
                return res.status(400).json({
                    success:0,
                    message:"Record not Found"
                })
            }
            return res.json({
                success:1,
                message:"Record Deleted Successfully"
            })
        })
    }

}