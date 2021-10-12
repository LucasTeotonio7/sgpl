import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { WeeklyControlService } from '../services/weekly-control.service'

@Component({
  selector: 'sgpl-weekly-control-list',
  templateUrl: './weekly-control-list.component.html',
  styleUrls: ['./weekly-control-list.component.css']
})
export class WeeklyControlListComponent implements OnInit {


  dataSource: any = []


  displayedColumns = ['name_supplier','mon','tue','wed','thu','fri','sat','sun','qty','product_price','total_price','status','action'];

  constructor(private WeeklyControlService: WeeklyControlService) { }


  ngOnInit(): void {
    this.WeeklyControlService.getWeeklyControlList().subscribe(data => {
      this.dataSource = data;
    })
  }

}
