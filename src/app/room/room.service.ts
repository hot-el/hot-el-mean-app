import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private http: HttpClient
  ) { }

  private roomUrl = 'api/room'

  getRooms(): Observable<any[]> {
    return this.http.get<any[]>(this.roomUrl);
    //handleError
  }
}
