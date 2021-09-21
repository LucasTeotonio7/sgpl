import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Supplier } from './supplier.model';

@Component({
  selector: 'sgpl-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  supplier: Supplier[] = [];

  displayedColumns = ['id', 'name','cpf', 'date_joining','action'];

  constructor(private SharedService: SharedService) { }

  ngOnInit(): void {
    this.SharedService.getSupplierList().subscribe(data => {
      this.supplier = data;
    })
  }

}
