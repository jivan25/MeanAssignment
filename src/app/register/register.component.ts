import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorObserver, Observable } from 'rxjs';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;
  arrayOfUserDetails:any[]=[];
  constructor(private formBuilder: FormBuilder,
    private router:Router,
    private employeeService:EmployeeService,
    private snackBar:MatSnackBar
    ) { }

  ngOnInit() {
    this.createForm();
   // this.setChangeValidate()
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let mobileRegex:RegExp= /^(\+\d{1,3}[- ]?)?\d{10}$/ 
    this.formGroup = this.formBuilder.group({
      emailId: [null, [Validators.required, Validators.pattern(emailregex)]],
      phone: [null, [Validators.required, Validators.pattern(mobileRegex)]],
      name: [null, Validators.required],
      password: [null, [  Validators.required ,Validators.minLength(5)]]
    });
  }

  onSubmit(userData) {
  this.employeeService.registerUser(userData).subscribe((data)=>{
    this.openSnackBar('User has registered successfully, Please check your mailbox for more info','')
      this.router.navigateByUrl('/login')
  },
  (error:ErrorObserver<any>)=>{
    this.openSnackBar(error.toString(),'')
  })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
