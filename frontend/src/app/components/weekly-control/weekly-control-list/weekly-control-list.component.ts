import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '../../product/models/product.model';
import { ProductService } from 'src/app/components/product/services/product.service';
import { FormactDateMonthDay } from '../../utils';
import { WeeklyControlService } from '../services/weekly-control.service'
import { Week } from '../weekly-control-form/week.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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


  dataSource: any = []

  weekView: any = {
    date_start:'',
    date_end:''
  }

  week: Week = {
    date_start:'',
    date_end:'',
    product: null
  }

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


  ngOnInit(): void {
    this.WeeklyControlService.getWeeklyControlList().subscribe(data => {
      this.dataSource = data;
    })
    this.WeeklyControlService.getLastWeek().subscribe(data => {
      this.week = data;
      this.weekView.date_start = FormactDateMonthDay(data.date_start)
      this.weekView.date_end = FormactDateMonthDay(data.date_end)

      this.ProductService.getProduct(data.product).subscribe(data => {
        this.product = data;
        console.log(this.product)
      });

    })

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, object: this.object}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.object = result;
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'modal.component.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }



}
