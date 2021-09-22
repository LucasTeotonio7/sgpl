import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from '../supplier-list/supplier.model';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'sgpl-supplier-delete',
  templateUrl: './supplier-delete.component.html',
  styleUrls: ['./supplier-delete.component.css']
})
export class SupplierDeleteComponent implements OnInit {

  supplier: Supplier = {
    id: null,
    name:'',
    cpf: '',
    date_joining: ''
  }

  constructor(private router: Router,
              private SupplierService: SupplierService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.SupplierService.getSupplier(id).subscribe(data => {
        this.supplier = data;
      });
  }

  cancelar(): void {
    this.router.navigate(['/fornecedores']);
  }

  DeleteSupplier(): void {
    this.SupplierService.deleteSupplier(this.supplier).subscribe(() => {
      this.SupplierService.showMessage('Excluido Fornecedor!');
      this.router.navigate(['/fornecedores']);
    });
  }

}
