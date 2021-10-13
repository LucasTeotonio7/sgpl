import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from '../supplier-list/supplier.model';
import { SupplierService } from 'src/app/components/supplier/services/supplier.service';

@Component({
  selector: 'sgpl-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css'],
  providers: [
    // {provide: DateAdapter, useClass: AppDateAdapter},
    // {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class SupplierFormComponent implements OnInit {

  title = 'Novo Fornecedor'

  supplier: Supplier = {
    name:'',
    cpf: '',
    date_joining: ''
  }

  constructor(private router: Router,
              private SupplierService: SupplierService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    if(id != null){
      this.SupplierService.getSupplier(id).subscribe(data => {
        this.supplier = data;
        console.log(data.date_joining)

      });
      console.log('SUPPLIER: ' + this.supplier.name)
      this.title = 'Atualizar Fornecedor'
    }

  }

  cancelar(): void {
    this.router.navigate(['/fornecedores']);
    // this.supplier.date_joining = FormactDate(this.supplier.date_joining)
    // console.log(this.supplier.date_joining)
  }

  createSupplier(): void {
    // this.coverterData();
    this.SupplierService.addSupplier(this.supplier).subscribe(() => {
      this.SupplierService.showMessage('Novo Registro Adicionado!');
      this.router.navigate(['/fornecedores']);
    });
  }

  updateSupplier(){
    this.SupplierService.updateSupplier(this.supplier).subscribe(() => {
      this.SupplierService.showMessage('Registro Atualizado!');
      this.router.navigate(['/fornecedores']);
    });
  }

  // coverterData(): void{
  //   var data = this.historico.data.split('-').reverse().join('/');
  //   this.historico.data = data;
  // }

}
