import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product-list/product.model';
import { ProductService } from 'src/app/components/product/services/product.service';
import { dataAtual } from '../../utils';
import { Choices } from '../../choices.model';

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

  choices: Choices[] = [];

  constructor(private router: Router,
              private ProductService: ProductService,
              private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.ProductService.getProductChoicesList().subscribe(data => {
      this.choices = data;
      console.log('choices: '+this.choices[0].key)
      console.log('data source: '+data)
    })
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
    this.ProductService.addProduct(this.product).subscribe(res=>{
      this.ProductService.showMessage(res.toString());
      this.router.navigate(['/produtos']);
    });
  }

  updateProduct(): void {
    this.ProductService.updateProduct(this.product).subscribe(res=>{
      this.ProductService.showMessage(res.toString());
      this.router.navigate(['/produtos']);
    });
  }

}
