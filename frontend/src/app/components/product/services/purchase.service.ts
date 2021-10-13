import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { MatSnackBar } from'@angular/material/snack-bar';
import { Purchase } from '../models/purchase.model';
import { map, catchError } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  readonly apiUrl = "http://127.0.0.1:8000";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false):void{
    this.snackBar.open(msg,'X',{
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  getPurchaseList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/purchase/');
  }

  getPurchase(id: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/purchase/${id}`);
  }

  addPurchase(purchase: Purchase) {
    return this.http.post(this.apiUrl + '/purchase/', purchase).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  updatePurchase(purchase: Purchase) {
    return this.http.put(this.apiUrl + '/purchase/', purchase);
  }

  deletePurchase(purchase: Purchase) {
    return this.http.delete(this.apiUrl + '/purchase/' + purchase.id);
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }

}
