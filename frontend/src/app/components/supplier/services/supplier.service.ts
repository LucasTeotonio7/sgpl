import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from'@angular/material/snack-bar';
import { Supplier } from '../supplier-list/supplier.model';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  readonly apiUrl = "http://127.0.0.1:8000/suppliers";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false):void{
    this.snackBar.open(msg,'X',{
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  getSupplierList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/supplier/');
  }

  getSupplier(id: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/supplier/${id}`);
  }

  addSupplier(supplier: Supplier) {
    return this.http.post(this.apiUrl + '/supplier/', supplier);
  }

  updateSupplier(supplier: Supplier) {
    return this.http.put(`${this.apiUrl}/supplier/${supplier.id}`, supplier);
  }

  deleteSupplier(supplier: Supplier) {
    return this.http.delete(`${this.apiUrl}/supplier/${supplier.id}`);
  }

}