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

  private roomsUrl = 'http://localhost:4040/api/rooms';

  constructor(private http: HttpClient) { }

  getRooms (): Observable<any> {
    return this.http.get(this.roomsUrl);
  }

  getUnreservedRooms (): Observable<any> {
    const url = `${this.roomsUrl}?filter[where][occupied]=false}`;
    return this.http.get(url);
  }

  getRoom (id): Observable<any> {
    const url = `${this.roomsUrl}/${id}`;
    return this.http.get(url);
  }

  addRoom (room): Observable<any> {
    // console.log('addRoom');
    return this.http.post(this.roomsUrl, room, httpOptions);
  }

  deleteRoom(room): Observable<any> {
    const id = typeof room === 'number' ? room : room.id;
    const url = `${this.roomsUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  getRoomsByCategory(category) {
    const url = `${this.roomsUrl}?filter[where][type]=${category}`;
    return this.http.get(url, httpOptions);
  }

  getUnreservedRoomsByCategory(category) {
    const url = `${this.roomsUrl}?filter[where][type]=${category}&filter[where][occupied]=false`;
    console.log(url);
    return this.http.get(url, httpOptions);
  }

  getRoomsByCategoryAndSize(category, size) {
    const url = `${this.roomsUrl}?filter[where][type]=${category}&filter[where][size]=${size}`;
    console.log(url);
    return this.http.get(url, httpOptions);
  }

  getUnreservedRoomsByCategoryAndSize(category, size) {
    const url = `${this.roomsUrl}?filter[where][type]=${category}&filter[where][size]=${size}&filter[where][occupied]=false`;
    console.log(url);
    return this.http.get(url, httpOptions);
  }

  updateRoom (room, room_id): Observable<any> {
    console.log('update');
    console.log(room);
    console.log('roooom');
    const url = `${this.roomsUrl}/${room_id}`;
    console.log(room_id);
    const body = JSON.stringify(room);
    console.log('body');
    console.log(body);
    return this.http.put(url, room, httpOptions).pipe();
  }

  // getRoomsByCategory(category: string) {
  //   this.getRooms()
  //       .subscribe(rooms => {
  //         return rooms.find((room) => {
  //           return room.type === category;
  //         });
  //       });
  //   }

    // getRoomsByCategory(category) {
    //   const filter: LoopBackFilter = {
    //     "include":{
    //       "relation": "answers"
    //     },
    //     "where": {
    //       "type": category
    //     }
    //   };
    //   return this.questionApi.find<Question>(filter)
    //   .toPromise()
    // }

}
