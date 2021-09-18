import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierDeleteComponent } from './components/supplier/supplier-delete/supplier-delete.component';
import { SupplierFormComponent } from './components/supplier/supplier-form/supplier-form.component';
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
    path: "fornecedores",
    component: SupplierComponent
  },
  {
    path: "fornecedores/novo-fornecedor",
    component: SupplierFormComponent
  },
  {
    path: "fornecedores/editar/:id",
    component: SupplierFormComponent
  },
  {
    path: "fornecedores/excluir/:id",
    component: SupplierDeleteComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
