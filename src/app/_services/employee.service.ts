import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const employeesUrl = 'http://localhost:4040/api/users';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
    ) { }

  /** GET employees from the server */
  getEmployees () {
    return this.http.get(employeesUrl, httpOptions);
  }

  getEmployeesByManager (): Observable<any> {
    const url = `${employeesUrl}/manager`;
    return this.http.get(url, httpOptions).pipe();
  }

  getEmployeesByManagerForCalendar () {
    const url = `${employeesUrl}/manager`;
    return this.http.get(url, httpOptions).pipe();
  }

  getEmployee(employeeId) {
    const url = `${employeesUrl}/${employeeId}`;
    return this.http.get(url, httpOptions).pipe();
  }

  createEmployeeByManager(employee) {
    const url = `${employeesUrl}/manager`;
    return this.http.post(url, employee, httpOptions).pipe();
  }

  createEmployeeByAdmin(employee) {
    const url = `${employeesUrl}/admin`;
    return this.http.post(url, employee, httpOptions).pipe();
  }

  deleteEmployee(employeeId) {
    const url = `${employeesUrl}/${employeeId}`;
    return this.http.delete(url, httpOptions);
  }

  updateEmployee(employee) {
    const url = `${employeesUrl}/${employee._id}`;
    return this.http.put(url, employee, httpOptions).pipe();
  }

  updatePassword(user) {
    const url = `${employeesUrl}/password/${user._id}`;
    return this.http.put(url, user, httpOptions).pipe();
  }

  updateEmployeeByAdmin(employee) {
    const url = `${employeesUrl}/admin/${employee._id}`;
    return this.http.put(url, employee, httpOptions).pipe();
  }

  updateEmployeeByManager(employee) {
    const url = `${employeesUrl}/manager/${employee._id}`;
    return this.http.put(url, employee, httpOptions).pipe();
  }

  checkEmailNotTaken(email: string, userId: string) {
    const url = `${employeesUrl}/checkEmailNotTaken`;
    return this.http.post(url, {
      email,
      userId
    });
  }

}


