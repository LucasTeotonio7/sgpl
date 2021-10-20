import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from '../../supplier/supplier-list/supplier.model';
import { FormactDate, string_to_datetime, stringToWeekday, dateWeekdayName } from '../../utils';
import { WeeklyControlService } from '../services/weekly-control.service'
import { Week, WeeklyCollection, weekView } from '../weekly-control-form/week.model';
import { SupplierService } from 'src/app/components/supplier/services/supplier.service';
import { PurchaseService } from 'src/app/components/product/services/purchase.service';
import { Purchase } from '../../product/models/purchase.model';

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
    date_end:'',
    product: null
  }

  weekView: weekView = {
    date_start:null,
    date_end:null
  }

  supplier: Supplier = {
    id: 0,
    name:'',
    cpf: '',
    date_joining: ''
  }

  purchase: Purchase = {
    id:0,
    purchase_closing_date:'',
    closed:false,
    product:0,
    supplier:0,
    week: 0,
  }

  constructor(private WeeklyControlService: WeeklyControlService,
              private SupplierService: SupplierService,
              private PurchaseService: PurchaseService,
              private route: ActivatedRoute,
              private router: Router) { }


  ngOnInit(): void {
    //TODO: create view backend, many requests!!
    const id = this.route.snapshot.paramMap.get('id');
    if(id != null){
      //get purchase
      this.PurchaseService.getPurchase(id).subscribe(data => {
        this.purchase = data;
        //get suplier
        this.SupplierService.getSupplier(this.purchase.supplier).subscribe(data => {
          this.supplier = data;
        })
        //get week
        //TODO: GETWEEK (WEEK.ID) !
        this.WeeklyControlService.getWeek(this.purchase.id).subscribe(data=>{
          this.week = data
          this.weekView.date_start = string_to_datetime(this.week.date_start)
          this.weekView.date_end = string_to_datetime(this.week.date_end)
          //get weekly collection
          this.WeeklyControlService.getWeeklyCollection(id).subscribe(data => {
            this.WeeklyControlValues = data;
            this.FillDataSource(this.week, this.WeeklyControlValues)
            this.generatedisplayedColumns(this.week.date_start)
          });
        })
      })
    }
  }

  cancelar(): void {
    this.router.navigate(['/controle-semanal']);
  }

  salvar(): void {
    for (var i=0; i < 7; i++) {
      if(this.dataSource[i].id){
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
            purchase:this.purchase.id,
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
          purchase:this.purchase.id,
        }
        this.dataSource.push(new_collection)
        date_start.setDate(date_start.getDate() + 1)
      }
    }

  }
}
