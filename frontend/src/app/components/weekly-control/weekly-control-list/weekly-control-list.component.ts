import { Component, OnInit } from '@angular/core';
import { string_to_datetime } from '../../utils';
import { WeeklyControlService } from '../services/weekly-control.service'
import { Week, weekView } from '../weekly-control-form/week.model';

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

  week: Week = {
    date_start:'',
    date_end:'',
    product: null
  }

  displayedColumns = ['name_supplier','mon','tue','wed','thu','fri','sat','sun','qty','product_price','total_price','status','action'];

  constructor(private WeeklyControlService: WeeklyControlService) { }


  ngOnInit(): void {
    this.WeeklyControlService.getWeeklyControlList().subscribe(data => {
      this.dataSource = data;
    })
    this.WeeklyControlService.getLastWeek().subscribe(data => {
      this.week = data;
      this.weekView.date_start = string_to_datetime(data.date_start)
      this.weekView.date_end = string_to_datetime(data.date_end)
    })

  }

}
