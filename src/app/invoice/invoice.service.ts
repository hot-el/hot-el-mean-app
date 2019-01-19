import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface IServiceResponse {
  total: number,
  results: Service[]
}

export class Service {
  constructor(
    public _id: String,
    public name: String,
    public description: String,
    public price: Number
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(
    private http: HttpClient
  ) { }

  private invoiceUrl = 'api/invoice'
  private serviceUrl = 'api/service'

  getInvoices(): Observable<any[]> {
    return this.http.get<any[]>(this.invoiceUrl);
    //handleError
  }

  getInvoice(id: string): Observable<any> {
    let url = `${this.invoiceUrl}/${id}`
    return this.http.get<any>(url);
    //handleError
  }

  addInvoice(invoice): Observable<any> {
    return this.http.post<any>(this.invoiceUrl, invoice);
    //handleError
  }

  updateInvoice(id: string, invoice) {
    let url = `${this.invoiceUrl}/${id}`
    return this.http.put<any>(url, invoice);
    //handleError
  }

  getServices(): Observable<any[]> {
    return this.http.get<any[]>(this.serviceUrl);
  }

  getServiceById(id: string) {
    let service;
    this.http.get<any>(`${this.serviceUrl}/${id}`).subscribe(s => service = s);
    return service;
  }

  searchServices(name: string): Observable<IServiceResponse> {
    return this.http.get<IServiceResponse>(`${this.serviceUrl}/name/${name}`)
      .pipe(
        tap((response: IServiceResponse) => {
          response.results = response.results
            .map(service => new Service(service._id, service.name, service.description, service.price))
            return response
        })
      );
  }
  
}
