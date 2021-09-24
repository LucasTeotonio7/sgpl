import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { MatSnackBar } from'@angular/material/snack-bar';
import { Product } from '../product-list/product.model';
import { Choices } from '../../choices.model';
import { map, catchError } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ProductService {
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

  getProductList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/product/');
  }

  getProduct(id: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/product/${id}`);
  }

  getProductChoicesList(): Observable<Choices[]> {
    return this.http.get<Choices[]>(this.apiUrl + '/product/choices/');
  }

  addProduct(product: Product) {
    return this.http.post(this.apiUrl + '/product/', product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  updateProduct(product: Product) {
    return this.http.put(this.apiUrl + '/product/', product);
  }

  deleteProduct(product: Product) {
    return this.http.delete(this.apiUrl + '/product/' + product.id);
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }

}
