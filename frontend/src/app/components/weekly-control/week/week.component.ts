import { Component, Inject, OnInit } from '@angular/core';
import { Week } from '../weekly-control-form/week.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { string_to_datetime, FormactDate } from '../../utils';
import { Product } from '../../product/models/product.model';
import { ProductService } from 'src/app/components/product/services/product.service';
import { WeeklyControlService } from '../services/weekly-control.service';

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

  products: Product[] = [];
  selectedProduct = ''

  constructor(
    private ProductService: ProductService,
    private WeeklyControlService: WeeklyControlService,
    public weekRef: MatDialogRef<WeekComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Week) {}

  ngOnInit(): void {


    this.ProductService.getProductList().subscribe(data => {
      this.products = data;

      console.log(this.products)
      console.log(this.new_week.product)

    })

    //fill new_week TODO: String() --> Remove later
    this.new_week.date_start = this.data.date_start
    this.new_week.date_end = this.data.date_end
    this.selectedProduct = String(this.data.product)


    let date_start = string_to_datetime(this.data.date_start)
    let date_end = string_to_datetime(this.data.date_end)
    date_start.setDate(date_start.getDate() + 7)
    date_end.setDate(date_start.getDate() + 6)
    this.new_week.date_start = FormactDate(date_start)
    this.new_week.date_end = FormactDate(date_end)
  }

  cancel(): void{
    this.weekRef.close();
    console.log("produto selecionado: ", this.new_week.product)
  }

  createWeek(): void {
    this.new_week.product = parseInt(this.selectedProduct)
    this.WeeklyControlService.addWeek(this.new_week).subscribe()
    this.weekRef.close();
  }

}
