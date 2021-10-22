import { Component, Inject, OnInit } from '@angular/core';
import { Week } from '../weekly-control-form/week.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { string_to_datetime, FormactDate } from '../../utils';

@Component({
  selector: 'sgpl-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {

  new_week: Week = {
    date_start:'',
    date_end:'',
    product: null
  }

  constructor(
    public weekRef: MatDialogRef<WeekComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Week) {}

  ngOnInit(): void {
    //fill new_week
    this.new_week.date_start = this.data.date_start
    this.new_week.date_end = this.data.date_end
    this.new_week.product = this.data.product

    let date_start = string_to_datetime(this.data.date_start)
    let date_end = string_to_datetime(this.data.date_end)
    date_start.setDate(date_start.getDate() + 7)
    date_end.setDate(date_start.getDate() + 6)
    this.new_week.date_start = FormactDate(date_start)
    this.new_week.date_end = FormactDate(date_end)
  }

  cancel(): void{
    this.weekRef.close();
  }

  createWeek(): void {
    console.log("create .. ")
  }

}
