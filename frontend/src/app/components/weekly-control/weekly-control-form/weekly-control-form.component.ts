import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormactDate, string_to_datetime, stringToWeekday, dateWeekdayName } from '../../utils';
import { WeeklyControlService } from '../services/weekly-control.service'
import { Week, WeeklyCollection, weekView } from '../weekly-control-form/week.model';


@Component({
  selector: 'sgpl-weekly-control-form',
  templateUrl: './weekly-control-form.component.html',
  styleUrls: ['./weekly-control-form.component.css']
})
export class WeeklyControlFormComponent implements OnInit {

  WeeklyControlValues: any[] = []
  dataSource: WeeklyCollection[] = []

  displayedColumns = [];

  week: Week = {
    date_start:'',
    date_end:''
  }

  weekView: weekView = {
    date_start:null,
    date_end:null
  }

  constructor(private WeeklyControlService: WeeklyControlService,
              private route: ActivatedRoute,
              private router: Router) { }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id != null){
      this.WeeklyControlService.getWeeklyCollection(id).subscribe(data => {
        this.WeeklyControlValues = data;

        this.WeeklyControlService.getWeek(id).subscribe(data=>{
          this.week = data
          this.FillDataSource(this.week, this.WeeklyControlValues)
          this.generatedisplayedColumns(this.week.date_start)
          this.weekView.date_start = string_to_datetime(this.week.date_start)
          this.weekView.date_end = string_to_datetime(this.week.date_end)
        })
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/controle-semanal']);
  }

  salvar(): void {
    for (var i=0; i < 7; i++) {
      if(this.dataSource[i].id){
        console.log(this.dataSource[i])
        this.WeeklyControlService.updateWeeklyCollection(this.dataSource[i]).subscribe()
      }else{
        if(this.dataSource[i].quantity!== null){
          this.WeeklyControlService.addWeeklyCollection(this.dataSource[i]).subscribe()
        }
      }
    }
    this.router.navigate(['/controle-semanal']);
  }

  generatedisplayedColumns(date_start){
    var date = string_to_datetime(date_start)
    for (var i = 0; i < 7; i++) {
      this.displayedColumns.push(dateWeekdayName(date))
      date.setDate(date.getDate() + 1)
   }
  }

  FillDataSource(week, weeklyCollection){
    var date_start = string_to_datetime(week.date_start)
    var j=0

    if(weeklyCollection.length>0){
      for (var i=0; i < 7; i++) {
        var date_array = string_to_datetime(weeklyCollection[j].date)
        if(date_start.valueOf() === date_array.valueOf()){
          this.dataSource.push(weeklyCollection[j])
          if (weeklyCollection[j+1]){
            j++
          }
        } else{
          var new_collection: WeeklyCollection = {
            date: FormactDate(date_start),
            quantity:null,
            purchase:1,
          }
          this.dataSource.push(new_collection)
        }
        date_start.setDate(date_start.getDate() + 1)
      }
    } else{
      for (var i=0; i < 7; i++) {
        var new_collection: WeeklyCollection = {
          date: FormactDate(date_start),
          quantity:null,
          purchase:1,
        }
        this.dataSource.push(new_collection)
      }
    }

  }

  FormactDateMonthDay(data) {
    data = new Date(data + ' 00:00:00');
    var day = String(data.getDate()).padStart(2, '0');
    var month = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][data.getMonth()];
    return day + ', ' + month;
  }
}


