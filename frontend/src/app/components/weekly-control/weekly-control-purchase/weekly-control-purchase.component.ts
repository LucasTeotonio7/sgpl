import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Purchase } from '../../product/models/purchase.model';
import { PurchaseService } from 'src/app/components/product/services/purchase.service';

@Component({
  selector: 'sgpl-weekly-control-purchase',
  template: '',
})
export class WeeklyControlPurchaseComponent implements OnInit {

  purchase: Purchase = {
    purchase_closing_date:null,
    closed:false,
    product:0,
    supplier:0,
    week: 0,
  }

  constructor(
        private router: Router,
        private PurchaseService: PurchaseService,
        private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.purchase.product = parseInt(this.route.snapshot.paramMap.get('product'));
    this.purchase.week = parseInt(this.route.snapshot.paramMap.get('week'));
    this.purchase.supplier = parseInt(this.route.snapshot.paramMap.get('supplier'));
    this.createPurchase()
  }

  createPurchase(): void {
    this.PurchaseService.addPurchase(this.purchase).subscribe(res=>{
      this.PurchaseService.getLastPurchase(this.purchase.product).subscribe(data=>{
        this.purchase = data;
        this.router.navigate([`controle-semanal/editar/${this.purchase.id}`]);
      })
    });
  }


}
