export interface EmployeeModel{
    id?:number,
    name:string,
    username:string,
    email:string,
    address:EmployeeAddress,
    phone:string
    website:string
    company:EmployeeCompany

}
export interface EmployeeAddress{
    street?:string,
    suite?:string,
    city?:string,
    zipcode?:string,
    geo?:EmployeeAddressGeo
}

export interface EmployeeAddressGeo{
    lat:number,
    lng:number
}

export interface EmployeeCompany{
    name:string,
    catchPhrase?:string,
    bs?:string
}