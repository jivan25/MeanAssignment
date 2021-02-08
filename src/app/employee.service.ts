import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators'


const httpHeaderOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  EMPLOYEE_MANAGE_URL=environment.employeeBaseUrl+'api/employee/'
  constructor(private httpClient:HttpClient) { }

  registerUser(body){
      return this.httpClient.post('http://localhost:3000/api/users/',body).pipe(catchError(this.handleError));
  }

  loginUser(body){
    return this.httpClient.post('http://localhost:3000/api/users/login',body).pipe(catchError(this.handleError));
  }

  createEmployee(body){
    return this.httpClient.post(this.EMPLOYEE_MANAGE_URL,body,httpHeaderOptions).pipe(catchError(this.handleError));
  }

  getEmployeeDetails(){
    return this.httpClient.get(this.EMPLOYEE_MANAGE_URL,httpHeaderOptions).pipe(catchError(this.handleError));
  }

  getEmployeeDetailById(id:number){
    return this.httpClient.get(this.EMPLOYEE_MANAGE_URL+id,httpHeaderOptions).pipe(catchError(this.handleError));
  }

  updateEmployee(body){
    return this.httpClient.put(this.EMPLOYEE_MANAGE_URL,body,httpHeaderOptions).pipe(catchError(this.handleError));
  }

  deleteEmployee(id:number){
    return this.httpClient.delete(this.EMPLOYEE_MANAGE_URL+id,httpHeaderOptions).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      //console.error('An error occurred:', error.error.message);
    } else {
      return throwError(
        error.error.message
      );
    }
  }

}
