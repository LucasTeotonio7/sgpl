import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Product } from '../../product/models/product.model';
import { ProductService } from 'src/app/components/product/services/product.service';
import { FormactDateMonthDay } from '../../utils';
import { WeeklyControlService } from '../services/weekly-control.service'
import { Week } from '../weekly-control-form/week.model';
import { MatDialog } from '@angular/material/dialog';
import { WeekComponent } from '../week/week.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface DialogData {
  object: string;
  name: string;
}

@Component({
  selector: 'sgpl-weekly-control-list',
  templateUrl: './weekly-control-list.component.html',
  styleUrls: ['./weekly-control-list.component.css']
})
export class WeeklyControlListComponent implements OnInit {


  // dataSource: any = []

  weekView: any = {
    date_start:'',
    date_end:''
  }

  week: Week = {
    id: null,
    date_start:'',
    date_end:'',
    product: null
  }

  weeks: Week[] = [];

  product: Product = {
    name:'',
    unit_measurement: '',
    registration_date: '',
    purchase_price: null
  }

  object: string;
  name: string;

  displayedColumns = ['name_supplier','mon','tue','wed','thu','fri','sat','sun','qty','product_price','total_price','status','action'];

  constructor(private WeeklyControlService: WeeklyControlService,
              private ProductService: ProductService,
              public dialog: MatDialog) {}

  dataSource = new MatTableDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit(): void {
    this.WeeklyControlService.getLastWeek().subscribe(data => {
      this.week = data;
      this.WeeklyControlService.getWeeklyControlList(data.date_start, data.date_end).subscribe(data => {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
      })
      this.weekView.date_start = FormactDateMonthDay(data.date_start)
      this.weekView.date_end = FormactDateMonthDay(data.date_end)

      this.ProductService.getProduct(data.product).subscribe(data => {
        this.product = data;
        this.WeeklyControlService.getWeeks(data.id).subscribe(data => {
          this.weeks = data;
        })
      });

    })

  }

  openDialog(): void {
    const weekRef = this.dialog.open(WeekComponent, {
      width: '500px',
      data: this.week
    });

    weekRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.object = result;
      this.ngOnInit()
    });
  }

  nextWeek(): void {
    for(var i=0; i < this.weeks.length; i++){
      if(this.week.id == this.weeks[i].id){
        console.log(this.week)
        if(this.weeks[i+1]){
          this.week = this.weeks[i+1]
          break
        }
      }
    }
    this.WeeklyControlService.getWeeklyControlList(this.week.date_start, this.week.date_end).subscribe(data => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
    })
    this.weekView.date_start = FormactDateMonthDay(this.week.date_start)
    this.weekView.date_end = FormactDateMonthDay(this.week.date_end)
    console.log(this.week)
  }

  lastWeek(): void {
    for(var i=0; i < this.weeks.length; i++){
      if(this.week.id == this.weeks[i].id){
        if(this.weeks[i-1]){
          this.week = this.weeks[i-1]
          break
        }
      }
    }
    this.WeeklyControlService.getWeeklyControlList(this.week.date_start, this.week.date_end).subscribe(data => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
    })
    this.weekView.date_start = FormactDateMonthDay(this.week.date_start)
    this.weekView.date_end = FormactDateMonthDay(this.week.date_end)
    console.log(this.week)
  }


}
