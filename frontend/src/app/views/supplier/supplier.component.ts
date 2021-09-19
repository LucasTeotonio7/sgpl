import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'sgpl-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Fornecedores',
      icon: 'local_shipping',
      routeUrl: 'supplier'
    }
  }

  ngOnInit(): void {
  }

  navegarNovoRegistro(): void{
    this.router.navigate(['fornecedores/novo-fornecedor']);
  }

}
