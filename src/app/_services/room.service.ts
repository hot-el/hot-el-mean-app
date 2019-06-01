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

  getFreeRooms (): Observable<any> {
    const url = `${this.roomsUrl}/ro/false/false`;
    return this.http.get(url);
  }

  getReservedRooms (): Observable<any> {
    const url = `${this.roomsUrl}/r/true`;
    return this.http.get(url);
  }

  getReservations (): Observable<any> {
    const url = `${this.roomsUrl}/reservations/all`;
    return this.http.get(url);
  }

  getReservation (room_id, reservation_id): Observable<any> {
    const url = `${this.roomsUrl}/change/${room_id}/${reservation_id}`;
    return this.http.get(url);
  }

  updateReservation (room_id, reservation_id, reservation): Observable<any> {
    const url = `${this.roomsUrl}/change/${room_id}/${reservation_id}`;
    return this.http.put(url, reservation, httpOptions);
  }

  deleteReservation (room_id, reservation_id): Observable<any> {
    const url = `${this.roomsUrl}/change/${room_id}/${reservation_id}`;
    return this.http.delete(url, httpOptions);
  }

  getActiveReservations (): Observable<any> {
    const url = `${this.roomsUrl}/reservations/active`;
    return this.http.get(url);
  }

  getOccupiedRooms (): Observable<any> {
    const url = `${this.roomsUrl}/o/true`;
    return this.http.get(url);
  }

  getOccupied (): Observable<any> {
    const url = `${this.roomsUrl}/occupied/occupied`;
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

  getRoomsByCategoryReservedAndOccupied(category, isReserved, isOccupied) {
    const url = `${this.roomsUrl}/cro/${category}/${isReserved}/${isOccupied}`;
    console.log(url);
    return this.http.get(url, httpOptions);
  }

  getRoomsByCategoryAndSize(category, size) {
    const url = `${this.roomsUrl}/cs/${category}/${size}`;
    return this.http.get(url, httpOptions);
  }

  getRoomsByCategorySizeReservedAndOccupied(category, size, isReserved, isOccupied) {
    const url = `${this.roomsUrl}/csro/${category}/${size}/${isReserved}/${isOccupied}`;
    return this.http.get(url, httpOptions);
  }

  updateRoom (room, room_id): Observable<any> {
    const url = `${this.roomsUrl}/${room_id}`;
    return this.http.put(url, room, httpOptions);
  }

  searchFreeRoomsBySizeAndType(from, to, size, type) {
    const url = `${this.roomsUrl}/free-rooms/${from}/${to}/${size}/${type}`;
    return this.http.get(url, httpOptions);
  }

  addReservationToRoom (reservation, room_id): Observable<any> {
    const url = `${this.roomsUrl}/add-reservation/${room_id}`;
    return this.http.put(url, reservation, httpOptions);
  }

}
