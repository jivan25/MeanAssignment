
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject, EmptyError, ErrorObserver } from 'rxjs';
import { EmployeeService } from 'src/app/employee.service';
import { EmployeeDeleteConfirmationdialogComponent } from '../employee-delete-confirmationdialog/employee-delete-confirmationdialog.component';
import { EmployeeModel } from '../employeeModel';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['name','email','phone','address','designation','update','delete'];
  dataSource:any= new MatTableDataSource<any>()
  arrayOfEmployeeDetails:any[]=[];
  emptyEmployeeList:boolean=false;
  constructor(
    private dialog: MatDialog,
    private snackBar:MatSnackBar,
    private router:Router,
    private employeeService:EmployeeService
    ) { }

  ngOnInit(): void {
    this.getEmployeeDetails()
  }
 getEmployeeDetails(){
  this.dataSource=[];
  this.employeeService.getEmployeeDetails().subscribe((data:any)=>{
    this.dataSource= data.data
    },
    (error:ErrorObserver<any>)=>{
      if(error.toString()==='Invalid Token or Token expried'){
        this.router.navigateByUrl('/login')
        localStorage.removeItem('token')
 }
      this.openSnackBar(error.toString(),'')
    })
 }

 editEmployee(employeeId){
  this.router.navigateByUrl('/employeeRegister/'+employeeId)
}

 addEmployee(){
      this.router.navigateByUrl('/employeeRegister')
 }

 deleteConfirmation(id,name) {

  const dialogRef = this.dialog.open(EmployeeDeleteConfirmationdialogComponent, {
    width: '520px',
    panelClass: ['add-update-dialog'],
    data: {employeeName:name}
  });
  dialogRef.afterClosed().subscribe(value => {

    if (value != undefined && value.message === "confirmed") {
           this.employeeService.deleteEmployee(id).subscribe((data)=>{
             console.log(data)
             this.getEmployeeDetails()
           },
           (error:ErrorObserver<any>)=>{
   
            if(error.toString()==='Invalid Token or Token expired'){
                   this.router.navigateByUrl('/login')
                   localStorage.removeItem('token')
                
            }
             this.openSnackBar(error.toString(),'')
           })
    }
     })
  }
    openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
