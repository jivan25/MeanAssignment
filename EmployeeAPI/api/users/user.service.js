const pool=require("../../config/database");

module.exports={
    create:(data,callback)=>{
          pool.query(
              'INSERT INTO userdetails(Name, EmailId, Phone, Password) VALUES (?,?,?,?)',
              [
                  data.name,
                  data.emailId, 
                  data.phone,
                  data.password,
              ],
              (error,results,fields)=>{
                  if(error){
                    return callback(error)
                  }
                  return callback(null,results)
              }
          );
    },

    getvalideUser:(data,callback)=>{
        pool.query(
            'select * from userdetails where EmailId=?',
            [
                data.emailId
            ],
            (error,results,fields)=>{
                if(error){
                  return callback(error)
                }
                console.log(results)
                return callback(null,results[0])
            }
        )

    }
}