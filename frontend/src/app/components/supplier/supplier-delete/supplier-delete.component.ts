import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from '../supplier-list/supplier.model';
import { SharedService } from 'src/app/services/shared.service';

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
              private SharedService: SharedService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.SharedService.getSupplier(id).subscribe(data => {
        this.supplier = data;
      });
  }

  cancelar(): void {
    this.router.navigate(['/fornecedores']);
  }

  DeleteSupplier(): void {
    this.SharedService.deleteSupplier(this.supplier).subscribe(() => {
      this.SharedService.showMessage('Excluido Fornecedor!');
      this.router.navigate(['/fornecedores']);
    });
  }

}
