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

  constructor(
    public weekRef: MatDialogRef<WeekComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Week) {}

  ngOnInit(): void {
    //TODO: Bug -> in the open and close of the modal, days are added infinitely
    let date_start = string_to_datetime(this.data.date_start)
    let date_end = string_to_datetime(this.data.date_end)
    date_start.setDate(date_start.getDate() + 7)
    date_end.setDate(date_start.getDate() + 6)
    this.data.date_start = FormactDate(date_start)
    this.data.date_end = FormactDate(date_end)
  }

  cancel(): void{
    this.weekRef.close();
  }

  createWeek(): void {
    console.log("create .. ")
  }

}
