import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const shiftsUrl = 'http://localhost:4040/api/shift';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor(private http: HttpClient) { }

  getShifts () {
    console.log('all shifts .');
    // const event = this.http.get(shiftsUrl, httpOptions).pipe(map(shift => {
    //   shift['hello'] = 'hello';
    // }));
    // const data = this.http.get(shiftsUrl, httpOptions);
    const sth = this.http.get(shiftsUrl, httpOptions).pipe(map(shift => console.log(shift)));
    console.log(sth);
    console.log(shiftsUrl);
    return this.http.get(shiftsUrl, httpOptions);
  }

  getShiftsByUserId (userId): Observable<any> {
    const url = `${shiftsUrl}/${userId}`;
    console.log(url);
    return this.http.get(url, httpOptions);
  }

  addShift(event) {
    console.log('HEEELO');
    console.log(event);
    const shift = {
      'userId': event.userId,
      'firstName': event.firstName,
      'lastName': event.lastName,
      'start': event.start,
      'role': event.role,
      'title': event.title,
      'color': event.color,
      'from': event.from,
      'to': event.to
    };
    console.log(shift);
    return this.http.post(shiftsUrl, shift, httpOptions).pipe();
  }

  deleteShift(id) {
    const url = `${shiftsUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }

}

