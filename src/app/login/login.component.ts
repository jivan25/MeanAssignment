import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorObserver } from 'rxjs';
import { AppComponent } from '../app.component';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  post: any = '';
  arrayOfUserDetails: any[] = [];
  isUserFound: boolean = true
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private snackBar:MatSnackBar,
    private employeeService: EmployeeService

  ) { }

  ngOnInit() {
    this.createForm();
    // this.setChangeValidate()
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      emailId: [null, [Validators.required, Validators.pattern(emailregex)]],
      password: [null, [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(post) {

    localStorage.removeItem('token')
    this.employeeService.loginUser(post).subscribe((data: any) => {
      localStorage.setItem('token', data.token)
      if (data.token!=undefined || data.token!="undefined"|| data.token!=null ||data.token!='null' ) {
        sessionStorage.setItem('userInfo',post.emailId)
        this.router.navigateByUrl('/employeeList')
      }
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
