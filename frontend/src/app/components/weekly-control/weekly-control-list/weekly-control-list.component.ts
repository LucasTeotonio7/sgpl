import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { WeeklyControlService } from '../services/weekly-control.service'
import { weekView } from '../weekly-control-form/week.model';

@Component({
  selector: 'sgpl-weekly-control-list',
  templateUrl: './weekly-control-list.component.html',
  styleUrls: ['./weekly-control-list.component.css']
})
export class WeeklyControlListComponent implements OnInit {


  dataSource: any = []

  weekView: weekView = {
    date_start:null,
    date_end:null
  }


  displayedColumns = ['name_supplier','mon','tue','wed','thu','fri','sat','sun','qty','product_price','total_price','status','action'];

  constructor(private WeeklyControlService: WeeklyControlService) { }


  ngOnInit(): void {
    this.WeeklyControlService.getWeeklyControlList().subscribe(data => {
      this.dataSource = data;
    })
  }

}
