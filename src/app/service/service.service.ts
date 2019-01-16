import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private http: HttpClient
  ) { }

  private serviceUrl = 'api/service'

  getServices(): Observable<any[]> {
    return this.http.get<any[]>(this.serviceUrl);
    //handleError
  }

  getService(id: string): Observable<any> {
    let url = `${this.serviceUrl}/${id}`
    return this.http.get<any>(url);
    //handleError
  }

  insertService(service): Observable<any> {
    return this.http.post<any>(this.serviceUrl, service);
  }

  updateService(id: string, service): Observable<any> {
    let url = `${this.serviceUrl}/${id}`
    return this.http.put<any>(url, service);
  }

  deleteService(id: string): Observable<any> {
    let url = `${this.serviceUrl}/${id}`
    return this.http.delete<any>(url);
  }
}
