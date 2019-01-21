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
    return this.http.get(shiftsUrl, httpOptions);
  }

  getShiftsByUserId (userId): Observable<any> {
    const url = `${shiftsUrl}/${userId}`;
    return this.http.get(url, httpOptions);
  }

  addShift(event) {
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
    return this.http.post(shiftsUrl, shift, httpOptions).pipe();
  }

  deleteShift(id) {
    const url = `${shiftsUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }

}

