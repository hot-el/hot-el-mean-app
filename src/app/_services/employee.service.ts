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
    console.log('all employees');
    return this.http.get(employeesUrl, httpOptions);
  }

  getEmployeesByManager () {
    console.log('all employees');
    const url = `${employeesUrl}/manager`;
    return this.http.get(url, httpOptions);
  }

//   : Observable<Employee>
  getEmployee(employeeId) {
    const url = `${employeesUrl}/${employeeId}`;
    console.log(url);
    // const data: Observable<any> = this.http.get(url, httpOptions).pipe(map(this.extractData));
    // console.log('extractedData2');
    // console.log(data.subscribe(e => console.log(e)));
    return this.http.get(url, httpOptions).pipe();
  }

//   searchEmployees(term: string): Observable<Employee[]> {
//     if (!term.trim()) {
//       // if not search term, return empty employee array.
//       return of([]);
//     }
//     const query = {
//       name: {
//         like: term
//       }
//     };
//     return this.employeeApi.find<Employee>({where: query}).pipe(
//       tap(_ => this.log(`found employees matching "${term}"`)),
//       catchError(this.handleError<Employee[]>('searchEmployee', []))
//     );
//   }

  createEmployeeByManager(employee) {
    console.log('post employee');
    console.log(employee);
    const url = `${employeesUrl}/manager`;
    return this.http.post(url, employee, httpOptions).pipe();
  }

  createEmployeeByAdmin(employee) {
    console.log('post employee');
    console.log(employee);
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

  updateEmployeeByAdmin(employee) {
    const url = `${employeesUrl}/admin/${employee._id}`;
    return this.http.put(url, employee, httpOptions).pipe();
  }

  updateEmployeeByManager(employee) {
    const url = `${employeesUrl}/manager/${employee._id}`;
    return this.http.put(url, employee, httpOptions).pipe();
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {}

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

}


