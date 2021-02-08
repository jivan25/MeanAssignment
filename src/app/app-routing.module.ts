import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './Employee/employee-list/employee-list.component';
import { EmployeeRegisterComponent } from './Employee/employee-register/employee-register.component';
import { AuthGuard } from './guards';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'employeeList', component: EmployeeListComponent,canActivate:[AuthGuard]},
  {path:'employeeRegister',component:EmployeeRegisterComponent,canActivate:[AuthGuard]},
  {path:'employeeRegister/:id',component:EmployeeRegisterComponent,canActivate:[AuthGuard]},
  {path:'**',component:LoginComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
