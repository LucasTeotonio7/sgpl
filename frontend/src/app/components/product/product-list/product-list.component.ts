import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/components/product/services/product.service';
import { Product } from './product.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'sgpl-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  product: Product[] = [];

  displayedColumns = ['id', 'name','unit_measurement','purchase_price','registration_date','action'];

  constructor(private ProductService: ProductService) { }

  dataSource = new MatTableDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.ProductService.getProductList().subscribe(data => {
      this.product = data;
      this.dataSource = new MatTableDataSource<Product>(this.product);
      this.dataSource.paginator = this.paginator;
    })
  }

}
