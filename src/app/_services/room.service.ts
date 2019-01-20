import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private roomsUrl = 'http://localhost:4040/api/room';

  constructor(private http: HttpClient) { }

  getRooms (): Observable<any> {
    return this.http.get(this.roomsUrl);
  }

  getUnreservedRooms (): Observable<any> {
    const url = `${this.roomsUrl}/o/false`;
    return this.http.get(url);
  }

  getReservedRooms (): Observable<any> {
    const url = `${this.roomsUrl}/o/true`;
    return this.http.get(url);
  }

  getRoom (id): Observable<any> {
    const url = `${this.roomsUrl}/${id}`;
    return this.http.get(url);
  }

  addRoom (room): Observable<any> {
    return this.http.post(this.roomsUrl, room, httpOptions);
  }

  deleteRoom(room): Observable<any> {
    const id = typeof room === 'number' ? room : room._id;
    const url = `${this.roomsUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  getRoomsByCategory(category) {
    const url = `${this.roomsUrl}/c/${category}`;
    return this.http.get(url, httpOptions);
  }

  getRoomsByCategoryAndOccupied(category, isOccupied) {
    const url = `${this.roomsUrl}/co/${category}/${isOccupied}`;
    console.log(url);
    return this.http.get(url, httpOptions);
  }

  getRoomsByCategoryAndSize(category, size) {
    const url = `${this.roomsUrl}/cs/${category}/${size}`;
    return this.http.get(url, httpOptions);
  }

  getRoomsByCategorySizeAndOccupied(category, size, isOccupied) {
    const url = `${this.roomsUrl}/cso/${category}/${size}/${isOccupied}`;
    return this.http.get(url, httpOptions);
  }

  updateRoom (room, room_id): Observable<any> {
    const url = `${this.roomsUrl}/${room_id}`;
    return this.http.put(url, room, httpOptions);
  }
}
