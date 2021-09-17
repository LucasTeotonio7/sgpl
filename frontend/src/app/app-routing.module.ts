import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControleSemanalComponent } from './views/controle-semanal/controle-semanal.component';
import { HomeComponent } from './views/home/home.component';
import { SupplierComponent } from './views/supplier/supplier.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "controle-semanal",
    component: ControleSemanalComponent
  },
  {
    path: "supplier",
    component: SupplierComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
