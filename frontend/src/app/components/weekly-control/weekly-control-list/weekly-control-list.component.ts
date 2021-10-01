import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { WeeklyControlService } from '../services/weekly-control.service'

@Component({
  selector: 'sgpl-weekly-control-list',
  templateUrl: './weekly-control-list.component.html',
  styleUrls: ['./weekly-control-list.component.css']
})
export class WeeklyControlListComponent implements OnInit {



  test: any = [
    {name_supplier:'Lorem Ipsum',sat: '23',sun: '12',mon: '14',tue: '17',wed: '29',thu: '20',fri: '21',qty: '136',product_price: '1.95',total_price: '265.2',status: 'OK'},
    {name_supplier:'Lorem Ipsum 2',sat: '233',sun: '132',mon: '134',tue: '137',wed: '293',thu: '320',fri: '231',qty: '136',product_price: '1.95',total_price: '2365.2',status: 'OK'},

  ];

  dataSource: any = []


  displayedColumns = ['name_supplier','mon','tue','wed','thu','fri','sat','sun','qty','product_price','total_price','status','action'];

  constructor(private WeeklyControlService: WeeklyControlService) { }


  ngOnInit(): void {
    this.WeeklyControlService.getWeeklyControlList().subscribe(data => {
      this.dataSource = data;
    })
  }

}
