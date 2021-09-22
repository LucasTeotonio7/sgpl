import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'sgpl-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Produtos',
      icon: 'inventory',
      routeUrl: 'produtos'
    }
  }

  ngOnInit(): void {
  }

  navegarNovoRegistro(): void{
    this.router.navigate(['produtos/novo-produto']);
  }

}
