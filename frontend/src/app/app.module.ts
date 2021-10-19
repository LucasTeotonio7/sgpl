import { NgModule,LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavigationComponent } from './components/template/navigation/navigation.component';
import { HomeComponent } from './views/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { SupplierComponent } from './views/supplier/supplier.component';
import { SupplierListComponent } from './components/supplier/supplier-list/supplier-list.component';
import { SupplierFormComponent } from './components/supplier/supplier-form/supplier-form.component';
import { SupplierDeleteComponent } from './components/supplier/supplier-delete/supplier-delete.component';

import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatCardModule} from '@angular/material/card';
import { MatTableModule } from '@angular/material/table'
import {HttpClientModule} from '@angular/common/http';

import {MatButtonModule} from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ProductComponent } from './views/product/product.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import {MatSelectModule} from '@angular/material/select';
import { WeeklyControlListComponent } from './components/weekly-control/weekly-control-list/weekly-control-list.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { WeeklyControlFormComponent } from './components/weekly-control/weekly-control-form/weekly-control-form.component';
import { WeeklyControlComponent } from './views/weekly-control/weekly-control.component';


// //providers LOCALE_ID
// import localePT from '@angular/common/locales/pt';
// import localeExtraPT from '@angular/common/locales/extra/pt';
// import { registerLocaleData } from '@angular/common';
// registerLocaleData(localePT, 'pt-BR', localeExtraPT);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    HomeComponent,
    SupplierComponent,
    SupplierListComponent,
    SupplierFormComponent,
    SupplierDeleteComponent,
    ProductComponent,
    ProductListComponent,
    ProductFormComponent,
    ProductDeleteComponent,
    WeeklyControlListComponent,
    WeeklyControlFormComponent,
    WeeklyControlComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  providers: [
    // {provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
