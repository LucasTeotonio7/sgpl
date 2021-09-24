import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product-list/product.model';
import { ProductService } from 'src/app/components/product/services/product.service';

@Component({
  selector: 'sgpl-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = {
    name:'',
    unit_measurement: '',
    registration_date: '',
    purchase_price: null
  }


  constructor(private router: Router,
              private ProductService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.ProductService.getProduct(id).subscribe(data => {
        this.product = data;
      });
  }

  cancelar(): void {
    this.router.navigate(['/produtos']);
  }

  DeleteProduct(): void {
    this.ProductService.deleteProduct(this.product).subscribe(() => {
      this.ProductService.showMessage('Excluido Produto!');
      this.router.navigate(['/produtos']);
    });
  }

}
