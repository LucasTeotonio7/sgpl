import { Component, OnInit, ViewChild } from '@angular/core';
import { SupplierService } from 'src/app/services/supplier.service';
import { Supplier } from './supplier.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'sgpl-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  supplier: Supplier[] = [];

  displayedColumns = ['id', 'name','cpf', 'date_joining','action'];

  constructor(private SupplierService: SupplierService) { }

  dataSource = new MatTableDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.SupplierService.getSupplierList().subscribe(data => {
      this.supplier = data;
      this.dataSource = new MatTableDataSource<Supplier>(this.supplier);
      this.dataSource.paginator = this.paginator;
    })
  }

}
