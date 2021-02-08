const pool = require("../../config/database");

module.exports = {
    create: (data, callback) => {
        pool.query(
            'INSERT INTO employeedetails(Name, EmailId, Phone,Address,Designation) VALUES (?,?,?,?,?)',
            [
                data.name,
                data.emailId,
                data.phone,
                data.address,
                data.designation
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        );
    },
    getEmployee: callback => {
        pool.query(
            "SELECT employeeId, Name, EmailId, Phone, Address, Designation FROM employeedetails",
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)
            }

        )
    },
    getEmployeeById: (id, callback) => {
        pool.query(
            "SELECT employeeId, Name, EmailId, Phone, Address, Designation FROM employeedetails where employeeId=?",
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results[0])
            }

        )
    },
    updateEmployee: (data, callback) => {
        pool.query(
            'UPDATE employeedetails SET Name=?,EmailId=?,Phone=?,Address=?,Designation=? WHERE employeeId=?',
            [
                data.name,
                data.emailId,
                data.phone,
                data.address,
                data.designation,
                data.empId
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results[0])
            }
        );
    },
    deleteEmployeeById: (id, callback) => {
        pool.query(
            "DELETE FROM employeedetails where employeeId=?",
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results.affectedRows)
            }

        )
    },

}