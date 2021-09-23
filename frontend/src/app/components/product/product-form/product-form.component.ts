import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product-list/product.model';
import { ProductService } from 'src/app/components/product/services/product.service';
import { dataAtual } from '../../utils';

@Component({
  selector: 'sgpl-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  title = 'Novo Fornecedor'

  product: Product = {
    name:'',
    unit_measurement: '',
    registration_date: dataAtual(),
    purchase_price: null
  }

  constructor(private router: Router,
              private ProductService: ProductService,
              private route: ActivatedRoute) { }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id != null){
      this.ProductService.getProduct(id).subscribe(data => {
        this.product = data;

      });
      this.title = 'Atualizar Produto'
    }
    console.log('data: '+ dataAtual())
  }

  cancelar(): void {
    this.router.navigate(['/produtos']);
  }

  createProduct(): void {
    // this.coverterData();
    this.ProductService.addProduct(this.product).subscribe(() => {
      this.ProductService.showMessage('Novo Registro Adicionado!');
      this.router.navigate(['/produtos']);
    });
  }

  updateProduct(){
    this.ProductService.updateProduct(this.product).subscribe(() => {
      this.ProductService.showMessage('Registro Atualizado!');
      this.router.navigate(['/produtos']);
    });
  }

}
