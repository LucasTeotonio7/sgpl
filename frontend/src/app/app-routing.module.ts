import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { SupplierDeleteComponent } from './components/supplier/supplier-delete/supplier-delete.component';
import { SupplierFormComponent } from './components/supplier/supplier-form/supplier-form.component';
import { ControleSemanalComponent } from './views/controle-semanal/controle-semanal.component';
import { HomeComponent } from './views/home/home.component';
import { ProductComponent } from './views/product/product.component';
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
  {
    path: "produtos",
    component: ProductComponent
  },
  {
    path: "produtos/novo-produto",
    component: ProductFormComponent
  },
  {
    path: "produtos/editar/:id",
    component: ProductFormComponent
  },
  {
    path: "produtos/excluir/:id",
    component: ProductDeleteComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
