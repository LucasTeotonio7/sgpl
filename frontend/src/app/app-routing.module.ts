import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControleSemanalComponent } from './views/controle-semanal/controle-semanal.component';
import { FornecedoresComponent } from './views/fornecedores/fornecedores.component';
import { HomeComponent } from './views/home/home.component';

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
    component: FornecedoresComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
