const {verify}= require('jsonwebtoken')

module.exports={
    checkToken:(req,res,next)=>{
        let token =req.get("authorization");

        if(token){
            token =token.slice(7)
            verify(token,"qwe1234",(err,decode)=>{
                if(err){
                    return res.status(401).json({
                        success:0,
                        message:"Invalid Token or Token expired"
                    })
                }else{
                    next();
                }
            })
        }else{
            return res.status(401).json({
                success:0,
                message:"Access denied! unauthorized user"
            })
        }
    }
}