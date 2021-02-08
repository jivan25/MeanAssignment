require('dotenv').config();
const express= require("express");
const cors= require('cors')

const app= express();
const userRouter= require("./api/users/user.router")
const employeeRouter=require("./api/employee/employee.router")

app.use(express.json())
app.use(cors())
app.use("/api/users",userRouter);
app.use("/api/employee",employeeRouter);
app.listen(process.env.APP_PORT,()=>{
    console.log("Server up and running :",process.env.APP_PORT)
})