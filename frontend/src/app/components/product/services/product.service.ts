import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from'@angular/material/snack-bar';
import { Product } from '../product-list/product.model';


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

  addProduct(product: Product) {
    return this.http.post(this.apiUrl + '/product/', product);
  }

  updateProduct(product: Product) {
    return this.http.put(this.apiUrl + '/product/', product);
  }

  deleteProduct(product: Product) {
    return this.http.delete(this.apiUrl + '/product/' + product.id);
  }

}
