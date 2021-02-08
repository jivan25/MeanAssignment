import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorObserver } from 'rxjs';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.css']
})
export class EmployeeRegisterComponent implements OnInit {
  formGroup: FormGroup;
  arrayOfEmployeeDetails: any[] = [];


  id: string;
  designations = [
    'Software Developer',
    'Software Tester',
    'Quality Analyst',
    'Manager',
    'Delivery Manager',
    'Dilivery Director'
  ];

  ratingArr = [];
  selectedProjectName: string;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {

    this.createForm();
    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id != null) {
      this.getEmployeeDetailsById(this.id)
    }
  }

  getEmployeeDetailsById(id) {
    this.employeeService.getEmployeeDetailById(id).subscribe((data: any) => {
      this.formGroup.get('name').setValue(data.data.Name)
      this.formGroup.get('emailId').setValue(data.data.EmailId)
      this.formGroup.get('phone').setValue(data.data.Phone)
      this.formGroup.get('designation').setValue(data.data.Designation)
      this.formGroup.get('address').setValue(data.data.Address)
    }, 
    (error:ErrorObserver<any>)=>{
      if(error.toString()==='Invalid Token or Token expired'){
        this.router.navigateByUrl('/login')
        localStorage.removeItem('token')
      
 }
      this.openSnackBar(error.toString(),'')
    })
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let mobileRegex: RegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/
    this.formGroup = this.formBuilder.group({
      emailId: [null, [Validators.required, Validators.pattern(emailregex)]],
      phone: [null, [Validators.required, Validators.pattern(mobileRegex)]],
      name: [null, Validators.required],
      designation: [null, Validators.required],
      address: [null, Validators.required],
    });
  }

  onCancel() {
    this.router.navigateByUrl('/employeeList')
  }

  onSubmit(formData) {
    if (this.id != null) {
      formData={
        ...formData,
        empId:parseInt(this.id)
      }
      this.employeeService.updateEmployee(formData).subscribe((data) => {
        this.openSnackBar('Employee has updated successfully','')
        this.router.navigateByUrl('/employeeList')
      }, 
      (error:ErrorObserver<any>)=>{
        if(error.toString()==='Invalid Token or Token expired'){
          this.router.navigateByUrl('/login')
          localStorage.removeItem('token')
        
   }
        this.openSnackBar(error.toString(),'')
      })
    } else {
        this.employeeService.createEmployee(formData).subscribe((data)=>{
          this.openSnackBar('Employee has registered successfully','')
          this.router.navigateByUrl('/employeeList')
        },
        (error:ErrorObserver<any>)=>{
          if(error.toString()==='Invalid Token or Token expired'){
            this.router.navigateByUrl('/login')
            localStorage.removeItem('token')
        
     }
          this.openSnackBar(error.toString(),'')
        })
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
