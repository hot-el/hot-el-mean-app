import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

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
    return this.http.get<any[]>(this.invoiceUrl)
    .pipe(tap((inv: any) => console.log(`${inv._id}`)));
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
  
}
