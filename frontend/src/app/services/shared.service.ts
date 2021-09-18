import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "http://127.0.0.1:8000";

  constructor(private http: HttpClient) { }

  getSupplierList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/supplier/');
  }

  addSupplier(val: any) {
    return this.http.post(this.APIUrl + '/supplier/', val);
  }

  updateSupplier(val: any) {
    return this.http.put(this.APIUrl + '/supplier/', val);
  }

  deleteSupplier(val: any) {
    return this.http.delete(this.APIUrl + '/supplier/' + val);
  }

}