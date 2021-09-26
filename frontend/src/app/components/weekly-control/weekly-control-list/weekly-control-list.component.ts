import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'sgpl-weekly-control-list',
  templateUrl: './weekly-control-list.component.html',
  styleUrls: ['./weekly-control-list.component.css']
})
export class WeeklyControlListComponent implements OnInit {

  dataSource = new MatTableDataSource;

  test: any = [
    {name_supplier:'Lorem Ipsum',sat: '23',sun: '12',mon: '14',tue: '17',wed: '29',thu: '20',fri: '21',qty: '136',product_price: '1.95',total_price: '265.2',status: 'OK'},
    {name_supplier:'Lorem Ipsum 2',sat: '233',sun: '132',mon: '134',tue: '137',wed: '293',thu: '320',fri: '231',qty: '136',product_price: '1.95',total_price: '2365.2',status: 'OK'},

  ];

  displayedColumns = ['name_supplier','sat','sun','mon','tue','wed','thu','fri','qty','product_price','total_price','status','action'];

  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.test);
  }

}
