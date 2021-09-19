import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from '../supplier-list/supplier.model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'sgpl-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css']
})
export class SupplierFormComponent implements OnInit {

  title = 'Novo Fornecedor'

  supplier: Supplier = {
    name:'',
    cpf: '',
    dateOfJoining: ''
  }

  constructor(private router: Router,
              private SharedService: SharedService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id != null){
      this.SharedService.getSupplier(id).subscribe(data => {
        this.supplier = data;
        console.log(data)

      });
      console.log('SUPPLIER: ' + this.supplier.name)
      this.title = 'Atualizar Fornecedor'
    }

  }

  cancelar(): void {
    this.router.navigate(['/fornecedores']);
  }

  createSupplier(): void {
    // this.coverterData();
    this.SharedService.addSupplier(this.supplier).subscribe(() => {
      this.SharedService.showMessage('Novo Registro Adicionado!');
      this.router.navigate(['/fornecedores']);
    });
  }

  updateSupplier(){
    this.SharedService.updateSupplier(this.supplier).subscribe(() => {
      this.SharedService.showMessage('Registro Atualizado!');
      this.router.navigate(['/fornecedores']);
    });
  }

  // coverterData(): void{
  //   var data = this.historico.data.split('-').reverse().join('/');
  //   this.historico.data = data;
  // }

}
